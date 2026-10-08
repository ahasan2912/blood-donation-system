import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Create and verify email transporter
 */
const createTransporter = () => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
        },
    });

    // Verify transporter configuration
    transporter.verify((error, success) => {
        if (error) {
            console.error('❌ Email transporter verification failed:', error);
        } else {
            console.log('✅ Email transporter is ready to send emails');
        }
    });

    return transporter;
};

/**
 * Send email using nodemailer
 * @param {string} emailAddress - Recipient email address
 * @param {Object} emailData - Email content object
 * @param {string} emailData.subject - Email subject
 * @param {string} emailData.message - Email message body
 */
export const sendEmail = async (emailAddress, emailData) => {
    try {
        const transporter = createTransporter();

        const mailBody = {
            from: process.env.NODEMAILER_USER, // sender address
            to: emailAddress, // list of receivers
            subject: emailData?.subject, // Subject line
            html: `<p>${emailData?.message}</p>`, // html body
        };

        // Send email
        const info = await transporter.sendMail(mailBody);
        console.log('📧 Email sent successfully:', info.response);
        return { success: true, info };
    } catch (error) {
        console.error('❌ Error sending email:', error);
        return { success: false, error };
    }
};

export default sendEmail;
