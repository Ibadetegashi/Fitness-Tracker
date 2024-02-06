const { createUserProfile } = require('../controllers/userProfile')
const verifyToken = require('../middlewares/verifyToken')

const router = require('express').Router()

router.post('/',verifyToken, createUserProfile)

module.exports = router