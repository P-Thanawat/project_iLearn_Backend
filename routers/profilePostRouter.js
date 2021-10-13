const express = require('express')
const profilePostController = require('../controllers/profilePostController')

const profilePostRouter = express.Router();

profilePostRouter.get('/', profilePostController.getAllProfilePost)
profilePostRouter.get('/:id', profilePostController.getProfilePostById)
profilePostRouter.post('/', profilePostController.uploadCloud, profilePostController.createProfilePost)
profilePostRouter.put('/', profilePostController.uploadCloud, profilePostController.updateProfilePost)
profilePostRouter.delete('/:id', profilePostController.deleteProfilePost)

module.exports = profilePostRouter;