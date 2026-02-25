import pool from '../db.js';

// Get full inventory
export const getInventory = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Inventory');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update item quantity
export const updateInventoryQuantity = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    try {
        const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
        await pool.query('UPDATE Inventory SET quantity = ?, lastUpdated = ? WHERE itemID = ?', [quantity, now, id]);
        res.json({ message: 'Inventory updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
