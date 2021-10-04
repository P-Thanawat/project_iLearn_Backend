const express = require('express')
const lessonsController = require('../controllers/lessonsController')
const userController = require('../controllers/userController')

const lessonsRouter = express.Router();

lessonsRouter.get('/', lessonsController.getAllLessons)
lessonsRouter.get('/:id', lessonsController.getLessonsById)
lessonsRouter.post('/', userController.authenticate, lessonsController.uploadCloud, lessonsController.createLessons) //need token
lessonsRouter.put('/:id', lessonsController.updateLessons)
lessonsRouter.delete('/:id', lessonsController.deleteLessons)

module.exports = lessonsRouter;