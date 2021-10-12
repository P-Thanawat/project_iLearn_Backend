const express = require('express')
const creditCardController = require('../controllers/creditCardController')
const userController = require('../controllers/userController')

const creditCardRouter = express.Router();

creditCardRouter.get('/', creditCardController.getAllCreditCard)
creditCardRouter.get('/:id', creditCardController.getCreditCardById)
creditCardRouter.post('/', userController.authenticate, creditCardController.createCreditCard)
creditCardRouter.put('/:id', creditCardController.updateCreditCard)
creditCardRouter.delete('/:id', creditCardController.deleteCreditCard)

module.exports = creditCardRouter;