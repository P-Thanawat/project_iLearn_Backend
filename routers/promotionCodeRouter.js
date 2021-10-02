const express = require('express')
const promotionCodeController = require('../controllers/promotionCodeController')

const promotionCodeRouter = express.Router();

promotionCodeRouter.get('/', promotionCodeController.getAllPromotionCode)
promotionCodeRouter.get('/:id', promotionCodeController.getPromotionCodeById)
promotionCodeRouter.post('/', promotionCodeController.createPromotionCode)
promotionCodeRouter.put('/:id', promotionCodeController.updatePromotionCode)
promotionCodeRouter.delete('/:id', promotionCodeController.deletePromotionCode)

module.exports = promotionCodeRouter;