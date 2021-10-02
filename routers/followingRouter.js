const express = require('express')
const followingController = require('../controllers/followingController')

const followingRouter = express.Router();

followingRouter.get('/', followingController.getAllFollowing)
followingRouter.get('/:id', followingController.getFollowingById)
followingRouter.post('/', followingController.createFollowing)
followingRouter.put('/:id', followingController.updateFollowing)
followingRouter.delete('/:id', followingController.deleteFollowing)

module.exports = followingRouter;