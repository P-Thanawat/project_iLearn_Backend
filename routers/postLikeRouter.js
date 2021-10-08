const express = require('express')
const postLikeController = require('../controllers/postLikeController')

const postLikeRouter = express.Router();

postLikeRouter.get('/', postLikeController.getAllPostLike)
postLikeRouter.get('/:id', postLikeController.getPostLikeById)
postLikeRouter.post('/', postLikeController.createPostLike)
postLikeRouter.put('/:id', postLikeController.updatePostLike)
postLikeRouter.delete('/:id', postLikeController.deletePostLike)

module.exports = postLikeRouter;