import pool from '../db.js';

// Get all services
export const getAllServices = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Service');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add new service
export const addService = async (req, res) => {
    const { serviceName, description, basePrice, availabilityStatus, vendorID, adminID } = req.body;
    try {
        const [lastService] = await pool.query('SELECT serviceID FROM Service ORDER BY serviceID DESC LIMIT 1');
        let nextID = 'SVC001';
        if (lastService.length > 0) {
            const lastNum = parseInt(lastService[0].serviceID.substring(3));
            nextID = `SVC${String(lastNum + 1).padStart(3, '0')}`;
        }

        await pool.query(
            'INSERT INTO Service (serviceID, serviceName, description, basePrice, availabilityStatus, vendorID, adminID) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [nextID, serviceName, description, basePrice, availabilityStatus || 'Available', vendorID, adminID]
        );
        res.status(201).json({ message: 'Service added successfully', serviceID: nextID });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
