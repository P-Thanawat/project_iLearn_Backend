const express = require('express')
const commentReplyController = require('../controllers/commentReplyController')
const userController = require('../controllers/userController')

const commentReplyRouter = express.Router();

// commentReplyRouter.use('/', userController.authenticate);
commentReplyRouter.get('/', commentReplyController.getAllCommentReply)
commentReplyRouter.get('/:id', commentReplyController.getCommentReplyById)
commentReplyRouter.post('/', userController.authenticate, commentReplyController.createCommentReply)
commentReplyRouter.put('/:id', commentReplyController.updateCommentReply)
commentReplyRouter.delete('/:id', commentReplyController.deleteCommentReply)

module.exports = commentReplyRouter;