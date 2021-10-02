const express = require('express')
const learnerProfileController = require('../controllers/learnerProfileController')
const userController = require('../controllers/userController')

const learnerProfileRouter = express.Router();

learnerProfileRouter.get('/', learnerProfileController.getAllLearnerProfile)
learnerProfileRouter.get('/:id', learnerProfileController.getLearnerProfileById)
learnerProfileRouter.get('/byUserId/:id', learnerProfileController.getLearnerProfileByUserId)
learnerProfileRouter.post('/', userController.authenticate, learnerProfileController.createLearnerProfile) //use token
learnerProfileRouter.put('/:id', learnerProfileController.updateLearnerProfile)
learnerProfileRouter.delete('/:id', learnerProfileController.deleteLearnerProfile)

module.exports = learnerProfileRouter;