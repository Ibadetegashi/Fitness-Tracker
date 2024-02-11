const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


const createWorkoutPlan = async (req, res) => {
    try {
        const { name, description } = req.body;
        const userId = req.user.userId

        const workoutPlan = await prisma.workoutPlan.create({
            data: {
                userId,
                name,
                description,
            },
        });

        if (!workoutPlan) {
            return res.status(400).json({ error: 'Workout plan failed to create' });
        }

        return res.status(201).json(workoutPlan);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
};

const editWorkoutPlan = async (req, res) => {
    try {
        const { name, description } = req.body;
        const userId = req.user.userId;
        const workoutPlanId = +req.params.id;

        const existingWorkoutPlan = await prisma.workoutPlan.findUnique({
            where: {
                id: workoutPlanId,
                userId,
            },
        });

        if (!existingWorkoutPlan) {
            return res.status(404).json({ error: 'Workout plan not found' });
        }

        const updatedWorkoutPlan = await prisma.workoutPlan.update({
            where: {
                id: workoutPlanId,
            },
            data: {
                name,
                description,
            },
        });

        return res.status(200).json({
                message: "Updated workout plan with success",
                updatedWorkoutPlan
            });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
};


const deleteWorkoutPlan = async (req, res) => {
    try {
        const userId = req.user.userId;
        const workoutPlanId = +req.params.id;

        const existingWorkoutPlan = await prisma.workoutPlan.findUnique({
            where: {
                id: workoutPlanId,
                userId,
            },
        });

        if (!existingWorkoutPlan) {
            return res.status(404).json({ error: 'Workout plan not found' });
        }

        const deletedWorkoutPlan = await prisma.workoutPlan.delete({
            where: {
                id: workoutPlanId,
            },
        });

        return res.status(200).json({
                message: 'Workout plan deleted successfully',
                deletedWorkoutPlan
            });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
};

const getWorkoutPlan = async (req, res) => {
    try {
        const userId = req.user.userId;
        const workoutPlanId = +req.params.id;

        const workoutPlan = await prisma.workoutPlan.findUnique({
            where: {
                id: workoutPlanId,
                userId,
            },
            include: {
                exercises: true,
            },
        });

        if (!workoutPlan) {
            return res.status(404).json({ error: 'Workout plan not found' });
        }

        return res.status(200).json(workoutPlan);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
};

const getWorkoutPlans = async (req, res) => {
    try {
        const userId = req.user.userId;

        const workoutPlan = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                WorkoutPlan: true,
            }
        })

        if (!workoutPlan) {
            return res.status(404).json({ error: 'No Workout plans were found' });
        }

        return res.status(200).json(workoutPlan.WorkoutPlan);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
};



module.exports = {
    createWorkoutPlan,
    editWorkoutPlan,
    deleteWorkoutPlan,
    getWorkoutPlan,
    getWorkoutPlans
}