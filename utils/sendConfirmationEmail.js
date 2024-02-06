const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
    tls: {
        rejectUnauthorized: false,
    },
})

function sendConfirmationEmail(email, confirmationToken) {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Confirm Your Email',
        text: `Click the following link to confirm your email: ${process.env.URL}/api/auth/confirm/${confirmationToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        error ? console.error('Email sending failed:', error)
            : console.log('Email sent', info.response);
    });
}

module.exports = { sendConfirmationEmail }
