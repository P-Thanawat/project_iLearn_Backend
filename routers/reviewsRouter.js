const express = require('express')
const reviewsController = require('../controllers/reviewsController')

const reviewsRouter = express.Router();

reviewsRouter.get('/', reviewsController.getAllReviews)
reviewsRouter.get('/:id', reviewsController.getReviewsById)
reviewsRouter.post('/', reviewsController.createReviews)
reviewsRouter.put('/:id', reviewsController.updateReviews)
reviewsRouter.delete('/:id', reviewsController.deleteReviews)

module.exports = reviewsRouter;