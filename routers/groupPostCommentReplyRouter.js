const express = require('express')
const groupPostCommentReplyController = require('../controllers/groupPostCommentReplyController')

const groupPostCommentReplyRouter = express.Router();

groupPostCommentReplyRouter.get('/', groupPostCommentReplyController.getAllGroupPostCommentReply)
groupPostCommentReplyRouter.get('/:id', groupPostCommentReplyController.getGroupPostCommentReplyById)
groupPostCommentReplyRouter.post('/', groupPostCommentReplyController.createGroupPostCommentReply)
groupPostCommentReplyRouter.put('/:id', groupPostCommentReplyController.updateGroupPostCommentReply)
groupPostCommentReplyRouter.delete('/:id', groupPostCommentReplyController.deleteGroupPostCommentReply)

module.exports = groupPostCommentReplyRouter;