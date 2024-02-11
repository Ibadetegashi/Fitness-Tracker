const { createExercise, updateExercise, getExercisesForWorkoutPlan, getExercise, deleteExercise } = require('../controllers/exercise')

const router = require('express').Router()

const verifyToken = require('../middlewares/verifyToken')

router.use(verifyToken)
router.post('/', createExercise)
router.put('/:id', updateExercise)
router.get('/workout-plan/:workoutPlanId', getExercisesForWorkoutPlan)
router.get('/:id', getExercise)
router.delete('/:id', deleteExercise)

module.exports = router