import express from 'express';
import { getAllBookings, createBooking, updateBookingStatus } from '../controllers/bookingController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, getAllBookings);
router.post('/', verifyToken, createBooking);
router.patch('/:id/status', verifyToken, updateBookingStatus);

export default router;
