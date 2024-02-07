const { PrismaClient } = require('@prisma/client')
const { sendUpdateConfirmationEmail } = require('../utils/sendConfirmationEmail')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')

const createUserProfile = async (req, res) => {
    try {
        const { age, weight, height, fitnessGoals } = req.body
        const userId = req.user.userId

        const profileExists = await prisma.userProfile.findUnique({
            where: {
                userId
            }
        })
        if (profileExists) {
            return res.status(409).json({ error: 'Profile already exists' })
        }

        const profile = await prisma.userProfile.create({
            data: {
                age,
                weight,
                height,
                fitnessGoals,
                // User: { connect: { id: userId } },
                userId
            }
        })
        if (!profile) {
            return res.status(400).json({ error: 'Profile failed to create' })
        }
        return res.status(201).json(profile)
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
}

const editProfile = async (req, res) => {
    try {
        const { age, weight, height, fitnessGoals, username } = req.body
        const userId = req.user.userId

        const profile = await prisma.userProfile.update({
            where: { userId },
            data: {
                age,
                weight,
                height,
                fitnessGoals,
                User: {
                    update: {
                        username
                    }
                }
            },
            include: {
                User: true
            }
        })

        delete profile.User.password
        res.status(200).json({ message: 'Updated profile with new information.', profile })

    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
}

//edit email
const updateUserEmail = async (req, res) => {
    try {
        const id = req.user.userId
        const { email } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });

        const existsEmail = await prisma.user.findUnique({
            where: { email }
        });

        if (existsEmail && existsEmail.id !== id) {
            return res.status(409).json({ error: 'The provided email already exists.', data: null });
        }
        //nese eshte emaili i njejt nuk kalon ne fazen e konfirmimit
        if (email === user.email) {
            return res.status(400).json({ error: 'The provided email is the same as the current one.', data: null });
        }
        const token = generateTokenForUser(user, email)
        sendUpdateConfirmationEmail(email, token, user.username);

        return res.json({ message: 'Please check your inbox and confirm your email update.' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error.');
    }
};

function generateTokenForUser(user, email) {
    return jwt.sign({ userId: user.id, email }, process.env.SECRET_KEY, { expiresIn: '15m' });
}

const confirmEmailUpdate = async (req, res) => {
    try {
        const token = req.params.token;
        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        const updatedUser = await prisma.user.update({
            where: { id: decoded.userId },
            data: {
                emailConfirmed: true,
                email: decoded.email
            },
        });

        delete updatedUser.password
        return res.status(200).json({ message: 'Email updated successfully.' });
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(403).json({ error: 'The confirmation link has expired. Please repeat the operation.' })
        } else {
            console.error(error);
            res.status(500).send('Internal Server Error.')
        }

    }
};
module.exports = {
    createUserProfile,
    editProfile,
    updateUserEmail,
    confirmEmailUpdate
}