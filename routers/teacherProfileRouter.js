const express = require('express')
const teacherProfileController = require('../controllers/teacherProfileController')
const userController = require('../controllers/userController')
const teacherProfileRouter = express.Router();

// teacherProfileRouter.use('/', userController.authenticate); //guest can see teacherProfile
teacherProfileRouter.get('/', teacherProfileController.getAllTeacherProfile)
teacherProfileRouter.get('/:id', teacherProfileController.getTeacherProfileById)
teacherProfileRouter.get('/byUserId/:id', teacherProfileController.getTeacherProfileByUserId)
teacherProfileRouter.post('/', teacherProfileController.createTeacherProfile)
teacherProfileRouter.put('/:id', teacherProfileController.updateTeacherProfile)
teacherProfileRouter.delete('/:id', teacherProfileController.deleteTeacherProfile)

module.exports = teacherProfileRouter;