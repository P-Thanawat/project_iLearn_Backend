const express = require('express')
const languageSpeakController = require('../controllers/languageSpeakController');
const userController = require('../controllers/userController');

const languageSpeakRouter = express.Router();

languageSpeakRouter.use('/', userController.authenticate)
languageSpeakRouter.get('/', languageSpeakController.getAllLanguageSpeak)
languageSpeakRouter.get('/:id', languageSpeakController.getLanguageSpeakById)
languageSpeakRouter.post('/', languageSpeakController.createLanguageSpeak)
languageSpeakRouter.put('/:id', languageSpeakController.updateLanguageSpeak)
languageSpeakRouter.delete('/:id', languageSpeakController.deleteLanguageSpeak)

module.exports = languageSpeakRouter;