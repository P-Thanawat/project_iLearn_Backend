const { following } = require("../models")

// get all data
exports.getAllFollowing = async (req, res, next) => {
  try {
    const data = await following.findAll({ where: { userAccountId: req.user.id } })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// get data by id
exports.getFollowingById = async (req, res, next) => { //used in learnProfile
  try {
    const { id } = req.params;
    const data = await following.findAll({ where: { learnerProfileId: id } })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// create data
exports.createFollowing = async (req, res, next) => {
  try {
    const { intoduceContent, presentText, aboutTeacher, recommendLesson, ableBooking, ableContact } = req.body;
    const data = await following.create({
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
exports.updateFollowing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { intoduceContent, presentText, aboutTeacher, ableBooking, ableContact } = req.body;
    const [rows] = await following.update({ ...req.body }, {
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
exports.deleteFollowing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await following.destroy({
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
