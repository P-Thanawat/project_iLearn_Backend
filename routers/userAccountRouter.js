const express = require('express')
const userAccountController = require('../controllers/userAccountController')

const userAccountRouter = express.Router();

userAccountRouter.get('/', userAccountController.getAllUserAccount)
userAccountRouter.get('/:id', userAccountController.getUserAccountById) // no token
userAccountRouter.post('/', userAccountController.createUserAccount)
userAccountRouter.put('/:id', userAccountController.updateUserAccount)
userAccountRouter.delete('/:id', userAccountController.deleteUserAccount)

module.exports = userAccountRouter;