const nodemailer = require("nodemailer");

// Create the transporter ONCE when the server starts
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// wrapper function to send emails
const sendEmail = async ({ to, subject, text, html }) => {
    try {
        const info = await transporter.sendMail({
            from: `"Library Support" <${process.env.SMTP_USER}>`,
            to,
            subject,
            text
        });
        console.log("Message sent: %s", info.messageId);
        return info;
    } catch (error) {
        console.error("Email sending failed:", error);
        throw new Error("Failed to send email");
    }
};

module.exports = { sendEmail };