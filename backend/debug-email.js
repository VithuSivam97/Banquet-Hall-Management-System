import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const testEmail = async () => {
    console.log('--- Starting Detailed Email Debug ---');
    console.log(`User: ${process.env.EMAIL_USER}`);

    // Config 2: STARTTLS (Port 587) - Alternative attempt
    console.log('\n[Attempt 2] Testing Port 587 (STARTTLS) with relaxed security...');
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // Must be false for 587
        tls: {
            rejectUnauthorized: false
        },
        logger: true, // Log to console
        debug: true,  // Include SMTP traffic
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        await transporter.verify();
        console.log('✅ Connection Verified Successfully!');

        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to self
            subject: 'Test Email from Debug Script',
            text: 'If you see this, email sending is working!'
        });
        console.log('✅ Email Sent! Message ID:', info.messageId);
        process.exit(0);
    } catch (error) {
        console.error('❌ Attempt 1 Failed:', error.message);
        if (error.code === 'EAUTH') console.error('   -> Check your App Password!');
        if (error.code === 'ESOCKET') console.error('   -> Network/Firewall blocking connection.');
    }

    console.log('\n---------------------------------------------------');
    process.exit(1);
};

testEmail();
