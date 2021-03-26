const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const validator = require('../controllers/validator')
const passport = require('passport')
const operationController = require('../controllers/operationController')
require('../config/passport.js')


router.route('/user/register')
.post(validator.register, userController.register)

router.route('/user/login')
.post(userController.logIn)

router.route('/user/ls')
.post(passport.authenticate('jwt', {session: false}), userController.logLS)

router.route('/operation')
.post(operationController.addOperation)
.get(operationController.allOperations)
.put(operationController.modOperation)
.delete(operationController.deleteOperation)

module.exports = router