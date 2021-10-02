const express = require('express')
const userController = require('../controllers/userController')

const userRouter = express.Router()

userRouter.post('/login', userController.login)
userRouter.post('/checkEmail', userController.checkEmail)
userRouter.post('/register', userController.uploadCould, userController.register)
userRouter.delete('/', userController.delete)

module.exports = userRouter;