import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail = async ({ to, subject, html ="" }) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const data = {
            from: process.env.EMAIL_ID,
            to,
            subject,
            html
        };

        const info = await transporter.sendMail(data);
        console.log("Email sent successfully:", info);

        return {
            message: "Email Sent Successfully",
            error: false,
            success: true
        };

    } catch (error) {
        console.error("Email sending error:", error);
        return {
            message: error.message || error,
            error: true,
            success: false
        };
    }
};
