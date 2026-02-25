import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import pool from '../db.js';
import fs from 'fs';
import path from 'path';

// Configure transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    tls: {
        rejectUnauthorized: false // Fix for Antivirus/Firewall self-signed certs
    },
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// In-memory OTP storage (for production, use Redis or a DB)
const otpStore = new Map();

// Helper to log to file
const logOtpToFile = (email, otp, type) => {
    try {
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] ${type} OTP for ${email}: ${otp}\n`;
        fs.appendFileSync(path.resolve('otp_log.txt'), logEntry);
    } catch (err) {
        console.error('Failed to write to otp_log.txt', err);
    }
};

export const register = async (req, res) => {
    const { name, email, password, phone, role } = req.body;

    try {
        // Check if user exists
        const [existingUser] = await pool.query('SELECT * FROM User WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ code: 'USER_EXISTS', message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate userID (U001 format logic)
        const [lastUser] = await pool.query('SELECT userID FROM User ORDER BY userID DESC LIMIT 1');
        let nextID = 'U001';
        if (lastUser.length > 0) {
            const lastNum = parseInt(lastUser[0].userID.substring(1));
            nextID = `U${String(lastNum + 1).padStart(3, '0')}`;
        }

        const now = new Date();
        const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');

        // Insert user
        await pool.query(
            'INSERT INTO User (userID, name, email, phone, password, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [nextID, name, email, phone || '0000000000', hashedPassword, role || 'Client', formattedDate, formattedDate]
        );

        // Create token
        const token = jwt.sign({ userId: nextID, email }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: { id: nextID, name, email, role: role || 'Client' }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Server error during registration' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await pool.query('SELECT * FROM User WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(404).json({ code: 'USER_NOT_FOUND', message: 'User not found' });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ code: 'INVALID_PASSWORD', message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.userID, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({
            message: 'Login successful',
            token,
            user: { id: user.userID, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error during login' });
    }
};

// Simplified OTP for demonstration
export const sendOTP = async (req, res) => {
    const { email } = req.body;
    try {
        // Generate 6 digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Store OTP with timestamp (valid for 10 minutes)
        otpStore.set(email, {
            otp,
            expires: Date.now() + 10 * 60 * 1000
        });

        // Log to file and console
        logOtpToFile(email, otp, 'REGISTRATION');
        console.log(`OTP for ${email}: ${otp}`);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your Verification Code - Raajeshwary Hall',
            text: `Your verification code is: ${otp}. It will expire in 10 minutes.`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                    <h2 style="color: #B36A5E;">Raajeshwary Hall</h2>
                    <p>Thank you for registering. Please use the following code to verify your email address:</p>
                    <div style="font-size: 24px; font-weight: bold; color: #CFAE70; padding: 10px; background-color: #f9f9f9; text-align: center; border-radius: 5px;">
                        ${otp}
                    </div>
                    <p style="font-size: 12px; color: #777; margin-top: 20px;">If you did not request this code, please ignore this email.</p>
                </div>
            `
        };

        // FIRE AND FORGET: Don't await the email. Send response immediately.
        transporter.sendMail(mailOptions).catch(err => {
            console.error('Background Email Send Failed:', err.message);
        });

        // Immediate success response so frontend doesn't timeout
        res.json({ message: 'OTP generated. Check email or console.', demoOTP: otp });

    } catch (error) {
        console.error('Controller error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const stored = otpStore.get(email);

        if (!stored) {
            return res.status(400).json({ message: 'No OTP requested for this email' });
        }

        if (Date.now() > stored.expires) {
            otpStore.delete(email);
            return res.status(400).json({ message: 'OTP has expired' });
        }

        if (stored.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // OTP is valid
        otpStore.delete(email);

        // Now call the registration logic
        req.body.role = 'Client';
        return register(req, res);
    } catch (error) {
        console.error('Verification error:', error);
        res.status(500).json({ error: 'Verification failed' });
    }
};

export const forgotPasswordSendOTP = async (req, res) => {
    const { email } = req.body;
    try {
        // Check if user exists
        const [users] = await pool.query('SELECT * FROM User WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(404).json({ message: 'User with this email does not exist' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        otpStore.set(`reset_${email}`, {
            otp,
            expires: Date.now() + 10 * 60 * 1000
        });

        // Log to file and console
        logOtpToFile(email, otp, 'PASSWORD RESET');
        console.log(`Reset OTP for ${email}: ${otp}`);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset OTP - Raajeshwary Hall',
            text: `Your password reset code is: ${otp}. It will expire in 10 minutes.`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                    <h2 style="color: #B36A5E;">Raajeshwary Hall</h2>
                    <p>You requested a password reset. Please use the following code to proceed:</p>
                    <div style="font-size: 24px; font-weight: bold; color: #CFAE70; padding: 10px; background-color: #f9f9f9; text-align: center; border-radius: 5px;">
                        ${otp}
                    </div>
                    <p style="font-size: 12px; color: #777; margin-top: 20px;">If you did not request this, please secure your account.</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: 'Password reset OTP sent!' });
    } catch (error) {
        console.error('Forgot password OTP error:', error);
        logOtpToFile(email, otpStore.get(`reset_${email}`)?.otp, 'FAILED EMAIL RECOVERY');
        res.status(500).json({ error: 'Failed to send OTP' });
    }
};

export const forgotPasswordVerifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    const stored = otpStore.get(`reset_${email}`);

    if (!stored || Date.now() > stored.expires || stored.otp !== otp) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    res.json({ success: true, message: 'OTP verified' });
};

export const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await pool.query('UPDATE User SET password = ?, updatedAt = NOW() WHERE email = ?', [hashedPassword, email]);

        otpStore.delete(`reset_${email}`);
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({ error: 'Failed to reset password' });
    }
};
