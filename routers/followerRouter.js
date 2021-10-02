const express = require('express')
const followerController = require('../controllers/followerController')

const followerRouter = express.Router();

followerRouter.get('/', followerController.getAllFollower)
followerRouter.get('/:id', followerController.getFollowerById)
followerRouter.post('/', followerController.createFollower)
followerRouter.put('/:id', followerController.updateFollower)
followerRouter.delete('/:id', followerController.deleteFollower)

module.exports = followerRouter;