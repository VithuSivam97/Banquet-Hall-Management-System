import express from 'express';
import {
    register,
    login,
    sendOTP,
    verifyOTP,
    forgotPasswordSendOTP,
    forgotPasswordVerifyOTP,
    resetPassword
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/register/send-otp', sendOTP);
router.post('/register/verify-otp', verifyOTP);

// Forgot Password routes
router.post('/forgot-password/send-otp', forgotPasswordSendOTP);
router.post('/forgot-password/verify-otp', forgotPasswordVerifyOTP);
router.post('/forgot-password/reset', resetPassword);

export default router;
