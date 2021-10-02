const express = require('express')
const creditCardController = require('../controllers/creditCardController')

const creditCardRouter = express.Router();

creditCardRouter.get('/', creditCardController.getAllCreditCard)
creditCardRouter.get('/:id', creditCardController.getCreditCardById)
creditCardRouter.post('/', creditCardController.createCreditCard)
creditCardRouter.put('/:id', creditCardController.updateCreditCard)
creditCardRouter.delete('/:id', creditCardController.deleteCreditCard)

module.exports = creditCardRouter;