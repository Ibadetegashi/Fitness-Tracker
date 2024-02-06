const { register, confirmToken, login } = require('../controllers/auth')

const router = require('express').Router()

router.post('/register', register)
router.get('/confirm/:confirmationToken', confirmToken)
router.post('/login', login)

module.exports = router;