const express = require('express')
const userAccountController = require('../controllers/userAccountController')
const userController = require('../controllers/userController')

const userAccountRouter = express.Router();

userAccountRouter.get('/', userAccountController.getAllUserAccount)
userAccountRouter.get('/:id', userAccountController.getUserAccountById) // no token
userAccountRouter.post('/', userAccountController.createUserAccount)
userAccountRouter.put('/', userController.authenticate, userAccountController.uploadCloud, userAccountController.updateUserAccount)
userAccountRouter.put('/topup', userController.authenticate, userAccountController.updateCredit)
userAccountRouter.put('/xp', userController.authenticate, userAccountController.updateXP)
userAccountRouter.put('/readMessage/', userController.authenticate, userAccountController.updateReadMessage)
userAccountRouter.delete('/:id', userAccountController.deleteUserAccount)

module.exports = userAccountRouter;