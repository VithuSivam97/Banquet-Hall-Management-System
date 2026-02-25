import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import pool from '../db.js';

// Transporter configuration
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const addStaff = async (req, res) => {
    const { name, email, phone, address, category } = req.body;

    // Validate inputs
    if (!name || !email || !category) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        // 1. Check if user exists
        const [existingUser] = await connection.query('SELECT * FROM User WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            await connection.rollback();
            return res.status(400).json({ code: 'USER_EXISTS', message: 'User with this email already exists' });
        }

        // 2. Create User
        // Generate userID
        const [lastUser] = await connection.query('SELECT userID FROM User ORDER BY userID DESC LIMIT 1');
        let nextUserID = 'U001';
        if (lastUser.length > 0) {
            const lastNum = parseInt(lastUser[0].userID.substring(1));
            nextUserID = `U${String(lastNum + 1).padStart(3, '0')}`;
        }

        // Generate temporary password
        const tempPassword = Math.random().toString(36).slice(-8); // Random 8 char password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(tempPassword, salt);

        const now = new Date();
        const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');

        await connection.query(
            'INSERT INTO User (userID, name, email, phone, password, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [nextUserID, name, email, phone || '0000000000', hashedPassword, 'Staff', formattedDate, formattedDate]
        );

        // 3. Create Staff
        // Generate staffID
        const [lastStaff] = await connection.query('SELECT staffID FROM Staff ORDER BY staffID DESC LIMIT 1');
        let nextStaffID = 'S001';
        if (lastStaff.length > 0) {
            const lastNum = parseInt(lastStaff[0].staffID.substring(1));
            nextStaffID = `S${String(lastNum + 1).padStart(3, '0')}`;
        }

        await connection.query(
            'INSERT INTO Staff (staffID, userID, shift, adminID, category) VALUES (?, ?, ?, ?, ?)',
            [nextStaffID, nextUserID, 'Day', 'A001', category]
        );

        await connection.commit();

        // 4. Send Email
        // Generate Reset Link
        const resetToken = jwt.sign({ userId: nextUserID, email }, process.env.JWT_SECRET, { expiresIn: '24h' });
        const resetLink = `http://localhost:5173/reset-password?token=${resetToken}&email=${email}`; // Frontend route

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to Raajeshwary Hall Team - Set Your Password',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                    <h2 style="color: #f97316;">Welcome, ${name}!</h2>
                    <p>You have been added to the Raajeshwary Hall staff team as <strong>${category}</strong>.</p>
                    <p>Please click the button below to set your password and access the dashboard:</p>
                    <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background-color: #f97316; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Set Password</a>
                    <p style="margin-top: 20px; color: #777;">This link is valid for 24 hours.</p>
                </div>
            `
        };

        // Attempt to send email, but log link if it fails (workaround for network blocks)
        try {
            await transporter.sendMail(mailOptions);
            console.log(`Welcome email sent to ${email}`);
        } catch (emailError) {
            console.error('Failed to send welcome email (Network/Auth Error).');
            console.log('--- MANUAL LINK (Use this if email failed) ---');
            console.log(resetLink);
            console.log('----------------------------------------------');
        }

        res.status(201).json({
            message: 'Staff member added successfully',
            staff: { id: nextStaffID, name, email, category }
        });

    } catch (error) {
        if (connection) await connection.rollback();
        console.error('Add Staff Error:', error);
        res.status(500).json({ message: 'Failed to add staff member', error: error.message });
    } finally {
        if (connection) connection.release();
    }
};
