import pool from './db.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const createStaffUser = async () => {
    const email = 'vithu97@gmail.com';
    const plainPassword = '123456';
    const name = 'Vithu Sivam'; // Default name
    const phone = '0000000000';   // Default phone

    try {
        console.log(`Checking for existing user: ${email}`);
        const [users] = await pool.query('SELECT * FROM User WHERE email = ?', [email]);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(plainPassword, salt);

        let userID;

        if (users.length > 0) {
            console.log('User exists. Updating role and password...');
            userID = users[0].userID;
            await pool.query('UPDATE User SET password = ?, role = ?, updatedAt = NOW() WHERE email = ?', [hashedPassword, 'Staff', email]);
        } else {
            console.log('User does not exist. Creating new staff user...');

            // Generate next User ID
            const [lastUser] = await pool.query('SELECT userID FROM User ORDER BY userID DESC LIMIT 1');
            let nextID = 'U001';
            if (lastUser.length > 0) {
                const lastNum = parseInt(lastUser[0].userID.substring(1));
                nextID = `U${String(lastNum + 1).padStart(3, '0')}`;
            }
            userID = nextID;

            const now = new Date();
            await pool.query(
                'INSERT INTO User (userID, name, email, phone, password, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [userID, name, email, phone, hashedPassword, 'Staff', now, now]
            );
        }

        // Check if Staff record exists
        const [staff] = await pool.query('SELECT * FROM Staff WHERE userID = ?', [userID]);
        if (staff.length === 0) {
            console.log('Creating linked Staff record...');

            // Generate next Staff ID
            const [lastStaff] = await pool.query('SELECT staffID FROM Staff ORDER BY staffID DESC LIMIT 1');
            let nextStaffID = 'S001';
            if (lastStaff.length > 0) {
                const lastNum = parseInt(lastStaff[0].staffID.substring(1));
                nextStaffID = `S${String(lastNum + 1).padStart(3, '0')}`;
            }

            // Assign to default Admin (A001) and default shift
            await pool.query(
                'INSERT INTO Staff (staffID, userID, shift, adminID) VALUES (?, ?, ?, ?)',
                [nextStaffID, userID, 'Day', 'A001']
            );
        } else {
            console.log('Staff record already exists.');
        }

        console.log('✅ Success! User vithu97@gmail.com is now a Staff member with password "123456".');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

createStaffUser();
