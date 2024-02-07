const { createUserProfile, editProfile, updateUserEmail, confirmEmailUpdate } = require('../controllers/userProfile')
const verifyToken = require('../middlewares/verifyToken')

const router = require('express').Router()

router.get('/confirm-update/:token', confirmEmailUpdate);

router.use(verifyToken) // verifyToken will create a req.user holding the userId
router.post('/', createUserProfile)
router.put('/', editProfile)
router.put('/update-email', updateUserEmail);


module.exports = router