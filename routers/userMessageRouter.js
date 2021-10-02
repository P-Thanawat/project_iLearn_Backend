const express = require('express')
const userMessagerController = require('../controllers/userMessengerController')

const userMessagerRouter = express.Router();

userMessagerRouter.get('/', userMessagerController.getAllUserMessenger)
userMessagerRouter.get('/:id', userMessagerController.getUserMessengerById)
userMessagerRouter.post('/', userMessagerController.createUserMessenger)
userMessagerRouter.put('/:id', userMessagerController.updateUserMessenger)
userMessagerRouter.delete('/:id', userMessagerController.deleteUserMessenger)

module.exports = userMessagerRouter;