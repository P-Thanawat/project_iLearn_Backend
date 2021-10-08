const { profilePost, userAccount } = require("../models")

// get all data
exports.getAllProfilePost = async (req, res, next) => {
  try {
    const data = await profilePost.findAll({ where: { userAccountId: req.user.id } })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// get data by id
exports.getProfilePostById = async (req, res, next) => { // used in learnprofile
  try {
    const { id } = req.params;
    const data = await profilePost.findAll({
      where: { learnerProfileId: id },
      include: {
        model: userAccount,
        as: 'postUser',
        attributes: { exclude: ['password'] }
      }
    })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// create data
exports.createProfilePost = async (req, res, next) => {
  try {
    const { intoduceContent, presentText, aboutTeacher, recommendLesson, ableBooking, ableContact } = req.body;
    const data = await profilePost.create({
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
exports.updateProfilePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { intoduceContent, presentText, aboutTeacher, ableBooking, ableContact } = req.body;
    const [rows] = await profilePost.update({ ...req.body }, {
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
exports.deleteProfilePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await profilePost.destroy({
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
