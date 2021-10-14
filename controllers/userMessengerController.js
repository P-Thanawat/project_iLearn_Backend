const { userMessenger, userAccount } = require("../models")
const { Op } = require("sequelize");

// get all data
exports.getAllUserMessenger = async (req, res, next) => {
  try {
    const data = await userMessenger.findAll({ where: { userAccountId: req.user.id } })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// get data by id
exports.getUserMessengerById = async (req, res, next) => { //used in messenger
  try {
    const { id } = req.params;
    console.log(`id`, id)
    const data = await userMessenger.findAll({
      where: { [Op.or]: [{ messageFrom: id }, { messageTo: id }] },
      include: {
        all: true
      }
    })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// create data
exports.createUserMessenger = async (req, res, next) => {
  try {
    const { message, messageFrom, messageTo } = req.body;
    const data = await userMessenger.create({
      message,
      messageFrom,
      messageTo
    })
    res.status(201).json({ data })
  }
  catch (err) {
    next(err)
  }
}

// update data by id
exports.updateUserMessenger = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { intoduceContent, presentText, aboutTeacher, ableBooking, ableContact } = req.body;
    const [rows] = await userMessenger.update({ ...req.body }, {
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
exports.deleteUserMessenger = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await userMessenger.destroy({
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
