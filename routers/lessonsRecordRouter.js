const express = require('express')
const lessonsRecordController = require('../controllers/lessonsRecordController')
const userController = require('../controllers/userController')
const lessonsRecordRouter = express.Router();

lessonsRecordRouter.get('/', userController.authenticate, lessonsRecordController.getAllLessonsRecord)
lessonsRecordRouter.get('/:id', lessonsRecordController.getLessonsRecordById)
lessonsRecordRouter.get('/byUserAccountId/:id', lessonsRecordController.getLessonsRecordByUserAccountId)
lessonsRecordRouter.post('/', lessonsRecordController.createLessonsRecord)
lessonsRecordRouter.put('/:id', lessonsRecordController.updateLessonsRecord)
lessonsRecordRouter.delete('/:id', lessonsRecordController.deleteLessonsRecord)

module.exports = lessonsRecordRouter;