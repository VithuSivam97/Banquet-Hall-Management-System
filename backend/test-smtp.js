import net from 'net';
import tls from 'tls';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const GMAIL_HOST = 'smtp.gmail.com';
const PORTS = [587, 465, 25];

async function checkPortQuery(port) {
    return new Promise((resolve) => {
        console.log(`\nTesting connection to ${GMAIL_HOST}:${port}...`);
        const socket = new net.Socket();
        socket.setTimeout(5000);

        socket.on('connect', () => {
            console.log(`✅ TCP Connection successful to port ${port}`);
            socket.destroy();
            resolve(true);
        });

        socket.on('timeout', () => {
            console.log(`❌ Timeout connecting to port ${port} (Likely Firewall/ISP Block)`);
            socket.destroy();
            resolve(false);
        });

        socket.on('error', (err) => {
            console.log(`❌ Error connecting to port ${port}: ${err.message}`);
            resolve(false);
        });

        socket.connect(port, GMAIL_HOST);
    });
}

async function testNodemailerAuth() {
    console.log('\nTesting Gmail Authentication...');
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        await transporter.verify();
        console.log('✅ SMTP Authentication work successfully!');
        return true;
    } catch (error) {
        console.log('❌ SMTP Authentication failed!');
        console.log('Error Code:', error.code);
        console.log('Error Message:', error.message);
        if (error.responseCode === 535) {
            console.log('👉 Hint: Check your EMAIL_USER and EMAIL_PASS in .env');
        } else if (error.code === 'EAUTH') {
            console.log('👉 Hint: Your App Password might be invalid or 2FA settings changed.');
        }
        return false;
    }
}

async function runDiagnostics() {
    console.log('=== SMTP Network Diagnostic Tool ===');
    console.log('Current Configured Email:', process.env.EMAIL_USER);

    let anyPortOpen = false;
    for (const port of PORTS) {
        const isOpen = await checkPortQuery(port);
        if (isOpen) anyPortOpen = true;
    }

    if (!anyPortOpen) {
        console.log('\n🚨 CRITICAL: No SMTP ports are reachable. This is 100% a network blocking issue.');
        console.log('Causes: ISP blocking, Firewall, Antivirus, or VPN.');
    } else {
        console.log('\nnetwork ports look reachable. Testing Auth...');
        await testNodemailerAuth();
    }
    console.log('====================================');
}

runDiagnostics();
