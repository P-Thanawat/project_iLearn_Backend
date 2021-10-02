const express = require('express')
const profilePostController = require('../controllers/profilePostController')

const profilePostRouter = express.Router();

profilePostRouter.get('/', profilePostController.getAllProfilePost)
profilePostRouter.get('/:id', profilePostController.getProfilePostById)
profilePostRouter.post('/', profilePostController.createProfilePost)
profilePostRouter.put('/:id', profilePostController.updateProfilePost)
profilePostRouter.delete('/:id', profilePostController.deleteProfilePost)

module.exports = profilePostRouter;