const { userAccount } = require("../models")

// get all data
exports.getAllUserAccount = async (req, res, next) => {
  try {
    const data = await userAccount.findAll()
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// get data by params id
exports.getUserAccountById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await userAccount.findOne({
      where: { id },
      attributes: { exclude: ['password'] }
    })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// create data
exports.createUserAccount = async (req, res, next) => {
  try {
    const { intoduceContent, presentText, aboutTeacher, recommendLesson, ableBooking, ableContact } = req.body;
    const data = await userAccount.create({
      ...req.body,
      userAccountId: req.user.id
    })
    res.status(201).json({ data })
  }
  catch (err) {
    next(err)
  }
}

// update data by id
exports.updateUserAccount = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { intoduceContent, presentText, aboutTeacher, ableBooking, ableContact } = req.body;
    const [rows] = await userAccount.update({ ...req.body }, {
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
exports.deleteUserAccount = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await userAccount.destroy({
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
