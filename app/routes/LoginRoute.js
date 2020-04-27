const router = require('express').Router()
const LoginController = require('../controllers/LoginController')

router.post('/', LoginController.authenticate)

module.exports = router