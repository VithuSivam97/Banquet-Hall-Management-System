import pool from '../db.js';

// Get all bookings with client names
export const getAllBookings = async (req, res) => {
    try {
        const [rows] = await pool.query(`
      SELECT b.*, u.name as clientName 
      FROM Booking b 
      JOIN Client c ON b.clientID = c.clientID 
      JOIN User u ON c.userID = u.userID
    `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new booking
export const createBooking = async (req, res) => {
    const { totalAmount, eventDate, hallUsageTime, hallID, clientID } = req.body;
    try {
        const [lastBooking] = await pool.query('SELECT bookingID FROM Booking ORDER BY bookingID DESC LIMIT 1');
        let nextID = 'B001';
        if (lastBooking.length > 0) {
            const lastNum = parseInt(lastBooking[0].bookingID.substring(1));
            nextID = `B${String(lastNum + 1).padStart(3, '0')}`;
        }

        await pool.query(
            'INSERT INTO Booking (bookingID, totalAmount, eventDate, hallUsageTime, bookingStatus, hallID, clientID) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [nextID, totalAmount, eventDate, hallUsageTime, 'Pending', hallID, clientID]
        );
        res.status(201).json({ message: 'Booking created successfully', bookingID: nextID });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        await pool.query('UPDATE Booking SET bookingStatus = ? WHERE bookingID = ?', [status, id]);
        res.json({ message: 'Booking status updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
