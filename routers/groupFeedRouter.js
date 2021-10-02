const express = require('express')
const groupFeedController = require('../controllers/groupFeedController')

const groupFeedRouter = express.Router();

groupFeedRouter.get('/', groupFeedController.getAllGroupFeed)
groupFeedRouter.get('/:id', groupFeedController.getGroupFeedById)
groupFeedRouter.post('/', groupFeedController.createGroupFeed)
groupFeedRouter.put('/:id', groupFeedController.updateGroupFeed)
groupFeedRouter.delete('/:id', groupFeedController.deleteGroupFeed)

module.exports = groupFeedRouter;