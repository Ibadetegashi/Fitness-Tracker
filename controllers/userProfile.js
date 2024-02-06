const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

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
            return res.status(409).json({ error: 'Profile already exists'})
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

module.exports = { createUserProfile }