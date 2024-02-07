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

function sendUpdateConfirmationEmail(email, token, name) {
    const mailOptions = {
        from: 'makerspace.powerup@gmail.com',
        to: email,
        subject: 'Confirm Your Email Update',
        text: `Dear ${name},\n\n`
            + `We received a request to update the email associated with your account. Please click the link below to confirm the email update. The confirmation link is valid for 15 minutes:\n\n`
            + `${process.env.URL}/api/user-profile/confirm-update/${token}\n\n`
            + `If you didn't initiate this request, please ignore this email. Your account security is important to us.\n\n`
            + `Thank you,\nThe Makerspace Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Email sending failed:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

module.exports = {
    sendConfirmationEmail,
    sendUpdateConfirmationEmail
}
