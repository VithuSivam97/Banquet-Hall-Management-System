import express from 'express';
import { getInventory, updateInventoryQuantity } from '../controllers/inventoryController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, getInventory);
router.patch('/:id', verifyToken, updateInventoryQuantity);

export default router;
