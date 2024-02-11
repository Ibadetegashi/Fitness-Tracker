const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const createExercise = async (req, res) => {
    try {
        const { workoutPlanId, name, sets, reps, duration } = req.body;

        const exercise = await prisma.exercise.create({
            data: {
                workoutPlanId,
                name,
                sets,
                reps,
                duration,
            },
        });

        return res.status(201).json(exercise);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getExercise = async (req, res) => {
    try {
        const exerciseId = +req.params.id;

        const exercise = await prisma.exercise.findUnique({
            where: {
                id: exerciseId,
            },
            include: {
                workoutPlan: true
            }
        });

        if (!exercise) {
            return res.status(404).json({ error: 'Exercise not found' });
        }

        return res.status(200).json(exercise);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getExercisesForWorkoutPlan = async (req, res) => {
    try {
        const workoutPlanId = +req.params.workoutPlanId;

        const workoutPlan = await prisma.workoutPlan.findUnique({
            where: {
                id: workoutPlanId,
            },
            include: {
                exercises: true,
            },
        });

        if (!workoutPlan) {
            return res.status(404).json({ error: 'Workout plan not found' });
        }

        const exercises = workoutPlan.exercises;

        return res.status(200).json(exercises);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateExercise = async (req, res) => {
    try {
        const exerciseId = +req.params.id;
        const { name, sets, reps, duration } = req.body;

        const existingExercise = await prisma.exercise.findUnique({
            where: {
                id: exerciseId,
            },
        });

        if (!existingExercise) {
            return res.status(404).json({ error: 'Exercise not found' });
        }

        const updatedExercise = await prisma.exercise.update({
            where: {
                id: exerciseId,
            },
            data: {
                name,
                sets,
                reps,
                duration,
            },
        });

        return res.status(200).json({
            message: "Exercise successfully updated",
            updatedExercise
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteExercise = async (req, res) => {
    try {
        const exerciseId = +req.params.id;

        const existingExercise = await prisma.exercise.findUnique({
            where: {
                id: exerciseId,
            },
        });

        if (!existingExercise) {
            return res.status(404).json({ error: 'Exercise not found' });
        }

        const deletedExercise = await prisma.exercise.delete({
            where: {
                id: exerciseId,
            },
        });

        return res.status(200).json({
            message: 'Exercise deleted successfully',
            deletedExercise
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports = {
    createExercise,
    getExercise,
    updateExercise,
    deleteExercise,
    getExercisesForWorkoutPlan
}