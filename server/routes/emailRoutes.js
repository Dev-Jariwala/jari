// emailRoutes.js file
import { Router } from 'express';
import { sendEmail } from '../controllers/emailController.js';

const router = Router();

// Route for sending an email
router.post('/send-email', sendEmail);

export default router;
