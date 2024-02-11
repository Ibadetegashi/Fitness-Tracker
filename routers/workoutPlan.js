const {
    createWorkoutPlan,
    editWorkoutPlan,
    deleteWorkoutPlan,
    getWorkoutPlan,
    getWorkoutPlans
} = require('../controllers/workoutPlan')

const router = require('express').Router()
const verifyToken = require('../middlewares/verifyToken')

router.use(verifyToken)
router.post('/', createWorkoutPlan)
router.put('/:id', editWorkoutPlan)
router.delete('/:id', deleteWorkoutPlan)
router.get('/:id', getWorkoutPlan)
router.get('/', getWorkoutPlans)

module.exports = router 