const express = require('express')
const userFriendController = require('../controllers/userFriendController')

const userFriendRouter = express.Router();

userFriendRouter.get('/', userFriendController.getAllUserFriend)
userFriendRouter.get('/:id', userFriendController.getUserFriendById)
userFriendRouter.post('/', userFriendController.createUserFriend)
userFriendRouter.put('/:id', userFriendController.updateUserFriend)
userFriendRouter.delete('/:id', userFriendController.deleteUserFriend)

module.exports = userFriendRouter;