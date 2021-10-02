const express = require('express')
const userGroupController = require('../controllers/userGroupController')

const userGroupRouter = express.Router();

userGroupRouter.get('/', userGroupController.getAllUserGroup)
userGroupRouter.get('/:id', userGroupController.getUserGroupById)
userGroupRouter.post('/', userGroupController.createUserGroup)
userGroupRouter.put('/:id', userGroupController.updateUserGroup)
userGroupRouter.delete('/:id', userGroupController.deleteUserGroup)

module.exports = userGroupRouter;