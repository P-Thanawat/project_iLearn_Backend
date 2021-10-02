const express = require('express')
const lessonsRecordController = require('../controllers/lessonsRecordController')

const lessonsRecordRouter = express.Router();

lessonsRecordRouter.get('/', lessonsRecordController.getAllLessonsRecord)
lessonsRecordRouter.get('/:id', lessonsRecordController.getLessonsRecordById)
lessonsRecordRouter.post('/', lessonsRecordController.createLessonsRecord)
lessonsRecordRouter.put('/:id', lessonsRecordController.updateLessonsRecord)
lessonsRecordRouter.delete('/:id', lessonsRecordController.deleteLessonsRecord)

module.exports = lessonsRecordRouter;