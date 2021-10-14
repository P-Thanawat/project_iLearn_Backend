const express = require('express')
const userMessengerController = require('../controllers/userMessengerController')

const userMessengerRouter = express.Router();

userMessengerRouter.get('/', userMessengerController.getAllUserMessenger)
userMessengerRouter.get('/:id', userMessengerController.getUserMessengerById)
userMessengerRouter.post('/', userMessengerController.createUserMessenger)
userMessengerRouter.put('/:id', userMessengerController.updateUserMessenger)
userMessengerRouter.delete('/:id', userMessengerController.deleteUserMessenger)

module.exports = userMessengerRouter;