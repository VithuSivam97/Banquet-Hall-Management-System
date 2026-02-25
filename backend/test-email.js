import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';

const testEmail = async () => {
    console.log('Testing Email Configuration...');
    console.log('User:', process.env.EMAIL_USER);
    // Don't log the full password
    console.log('Pass configured:', process.env.EMAIL_PASS ? 'Yes' : 'No');

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        console.log('Attempting to send mail...');
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to self for testing
            subject: 'Test Email from SMTP Debugger',
            text: 'If you receive this, your email configuration is working!'
        });
        console.log('Email sent successfully!');
        console.log('Message ID:', info.messageId);
    } catch (error) {
        console.error('Failed to send email:');
        console.error(error);
    }
};

testEmail();
