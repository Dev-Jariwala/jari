// emailController.js
import nodemailer from 'nodemailer';
import { smtpConfig } from '../config/smtpConfig.js';

export const sendEmail = async (req, res) => {
    const { to, subject, text } = req.body;
    try {
        const transporter = nodemailer.createTransport(smtpConfig);

        const info = await transporter.sendMail({
            from: smtpConfig.auth.user,
            to,
            subject,
            text
        });

        res.status(200).json({ message: 'Email sent successfully', info });
    } catch (error) {
        res.status(500).json({ error: 'Error sending email', details: error });
    }
};
