const express = require('express')
const lessonOptionController = require('../controllers/lessonOptionController')

const lessonOptionRouter = express.Router();

lessonOptionRouter.get('/', lessonOptionController.getAllLessonOption)
lessonOptionRouter.get('/:id', lessonOptionController.getLessonOptionById)
lessonOptionRouter.post('/', lessonOptionController.createLessonOption)
lessonOptionRouter.put('/:id', lessonOptionController.updateLessonOption)
lessonOptionRouter.delete('/:id', lessonOptionController.deleteLessonOption)

module.exports = lessonOptionRouter;