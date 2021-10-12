const { creditCard } = require("../models")

// get all data
exports.getAllCreditCard = async (req, res, next) => {
  try {
    const data = await creditCard.findAll({ where: { userAccountId: req.user.id } })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// get data by id
exports.getCreditCardById = async (req, res, next) => { //used in payment
  try {
    const { id } = req.params;
    const data = await creditCard.findAll({ where: { userAccountId: id } })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// create data
exports.createCreditCard = async (req, res, next) => { //used in add credit card
  try {
    const { cardNumber, expiration, securityCode, confirmCard } = req.body;
    const data = await creditCard.create({
      cardNumber,
      expiration,
      securityCode,
      confirmCard,
      userAccountId: req.user.id
    })
    res.status(201).json({ data })
  }
  catch (err) {
    next(err)
  }
}

// update data by id
exports.updateCreditCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { intoduceContent, presentText, aboutTeacher, ableBooking, ableContact } = req.body;
    const [rows] = await creditCard.update({ ...req.body }, {
      where: {
        id,
        userAccountId: req.user.id
      }
    })
    if (rows === 0) return res.status(400).json({ message: 'Update is failed' })
    res.json({ message: 'Update is successful' })
  }
  catch (err) {
    next(err)
  }
}

// delete data by id
exports.deleteCreditCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await creditCard.destroy({
      where: {
        id,
        userAccountId: req.user.id
      }
    })
    if (rows === 0) return res.status(400).json({ message: 'Delete is failed' })
    res.status(204).json()
  }
  catch (err) {
    next(err)
  }
}
