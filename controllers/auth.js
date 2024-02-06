const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const { sendConfirmationEmail } = require('../utils/sendConfirmationEmail')
const jwt = require('jsonwebtoken')


const register = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body
        const hashPassword = await bcrypt.hash(password, 10)
        const confirmationToken = crypto.randomBytes(32).toString('hex')

        const emailExists = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (emailExists) {
            return res.status(409).json({ error: 'Email already exists.' })
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match." })
        }

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashPassword,
                confirmationToken
            }
        })
        if (!user) {
            return res.status(400).json({ error: "Registration failed" });
        }

        sendConfirmationEmail(email, confirmationToken);

        res.status(201).json({ message: 'Registration successful. Please check your email for confirmation.' });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
}

const confirmToken = async (req, res) => {
    try {
        const { confirmationToken } = req.params;

        const user = await prisma.user.findFirst({
            where: {
                confirmationToken
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const updateUser = await prisma.user.update({
            where: { id: user.id },
            data: { emailConfirmed: true, confirmationToken: null }
        });

        delete updateUser.password
        res.json({ message: 'Email confirmed successfully', user: updateUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: "Wrong email or password" });
        }
        if (!user.emailConfirmed) {
            return res.status(401).json({ message: 'Email not confirmed. Please check your email for confirmation.' });
        }

        const token = jwt.sign(
            {
                userId: user.id,
            },
            process.env.SECRET_KEY,
            {
                expiresIn: '2h'
            }
        );

        res.status(200).json({ token })

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports = {
    register,
    confirmToken,
    login
}