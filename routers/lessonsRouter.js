const express = require('express')
const lessonsController = require('../controllers/lessonsController')

const lessonsRouter = express.Router();

lessonsRouter.get('/', lessonsController.getAllLessons)
lessonsRouter.get('/:id', lessonsController.getLessonsById)
lessonsRouter.post('/', lessonsController.createLessons)
lessonsRouter.put('/:id', lessonsController.updateLessons)
lessonsRouter.delete('/:id', lessonsController.deleteLessons)

module.exports = lessonsRouter;