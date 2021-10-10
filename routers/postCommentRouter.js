const express = require('express')
const postCommentController = require('../controllers/postCommentController')
const userController = require('../controllers/userController')

const postCommentRouter = express.Router();

postCommentRouter.get('/', postCommentController.getAllPostComment)
postCommentRouter.get('/:id', postCommentController.getPostCommentById)
postCommentRouter.post('/', userController.authenticate, postCommentController.createPostComment)
postCommentRouter.put('/:id', postCommentController.updatePostComment)
postCommentRouter.delete('/:id', postCommentController.deletePostComment)

module.exports = postCommentRouter;