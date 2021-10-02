const express = require('express')
const availableController = require('../controllers/availableController')
const userController = require('../controllers/userController')

const availableRouter = express.Router();

availableRouter.use('/', userController.authenticate);
availableRouter.get('/', availableController.getAllAvailable)
availableRouter.get('/:id', availableController.getAvailableById)
availableRouter.post('/', availableController.createAvailable)
availableRouter.put('/:id', availableController.updateAvailable)
availableRouter.delete('/:id', availableController.deleteAvailable)

module.exports = availableRouter;