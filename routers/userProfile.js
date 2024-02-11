const { createUserProfile, editProfile, updateUserEmail, confirmEmailUpdate, getUserProfile } = require('../controllers/userProfile')
const verifyToken = require('../middlewares/verifyToken')

const router = require('express').Router()

router.get('/confirm-update/:token', confirmEmailUpdate);

router.use(verifyToken) // verifyToken will create a req.user holding the userId
router.post('/', createUserProfile)
router.put('/', editProfile)
router.put('/update-email', updateUserEmail);
router.get('/', getUserProfile);


module.exports = router