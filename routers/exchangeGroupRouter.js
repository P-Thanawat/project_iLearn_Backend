const express = require('express')
const exchangeGroupController = require('../controllers/exchangeGroupController')

const exchangeGroupRouter = express.Router();

exchangeGroupRouter.get('/', exchangeGroupController.getAllExchangeGroup)
exchangeGroupRouter.get('/:id', exchangeGroupController.getExchangeGroupById)
exchangeGroupRouter.post('/', exchangeGroupController.createExchangeGroup)
exchangeGroupRouter.put('/:id', exchangeGroupController.updateExchangeGroup)
exchangeGroupRouter.delete('/:id', exchangeGroupController.deleteExchangeGroup)

module.exports = exchangeGroupRouter;