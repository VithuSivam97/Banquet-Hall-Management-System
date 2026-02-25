import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2/promise';

const deleteLastUser = async () => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD,
        database: 'BanquetHallManagement'
    });

    try {
        // 1. Get the last User ID
        const [users] = await connection.query('SELECT userID FROM User ORDER BY userID DESC LIMIT 1');

        if (users.length === 0) {
            console.log('No users found to delete.');
            return;
        }

        const lastUserID = users[0].userID;
        console.log(`Found last user: ${lastUserID}`);

        // 2. Delete from Staff first (since Staff refers to User)
        // Even if ON DELETE CASCADE is set, explicit deletion is safer/clearer for this script
        const [staffResult] = await connection.query('DELETE FROM Staff WHERE userID = ?', [lastUserID]);
        console.log(`Deleted ${staffResult.affectedRows} related staff record(s).`);

        // 3. Delete from User
        const [userResult] = await connection.query('DELETE FROM User WHERE userID = ?', [lastUserID]);
        console.log(`Deleted ${userResult.affectedRows} user record.`);

    } catch (error) {
        console.error('Error deleting user:', error);
    } finally {
        await connection.end();
    }
};

deleteLastUser();
