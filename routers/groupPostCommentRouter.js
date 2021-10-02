const express = require('express')
const groupPostCommentController = require('../controllers/groupPostCommentController')

const groupPostCommentRouter = express.Router();

groupPostCommentRouter.get('/', groupPostCommentController.getAllGroupPostComment)
groupPostCommentRouter.get('/:id', groupPostCommentController.getGroupPostCommentById)
groupPostCommentRouter.post('/', groupPostCommentController.createGroupPostComment)
groupPostCommentRouter.put('/:id', groupPostCommentController.updateGroupPostComment)
groupPostCommentRouter.delete('/:id', groupPostCommentController.deleteGroupPostComment)

module.exports = groupPostCommentRouter;