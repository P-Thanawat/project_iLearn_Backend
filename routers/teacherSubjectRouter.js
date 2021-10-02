const express = require('express')
const teacherSubjectController = require('../controllers/teacherSubjectController')

const teacherSubjectRouter = express.Router();

teacherSubjectRouter.get('/', teacherSubjectController.getAllTeacherSubject)
teacherSubjectRouter.get('/:id', teacherSubjectController.getTeacherSubjectById)
teacherSubjectRouter.post('/', teacherSubjectController.createTeacherSubject)
teacherSubjectRouter.put('/:id', teacherSubjectController.updateTeacherSubject)
teacherSubjectRouter.delete('/:id', teacherSubjectController.deleteTeacherSubject)

module.exports = teacherSubjectRouter;