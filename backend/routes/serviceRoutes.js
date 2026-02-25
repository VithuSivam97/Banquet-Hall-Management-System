import express from 'express';
import { getAllServices, addService } from '../controllers/serviceController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllServices);
router.post('/', verifyToken, addService);

export default router;
