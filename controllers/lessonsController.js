const { lessons } = require("../models")

// get all data
exports.getAllLessons = async (req, res, next) => {
  try {
    const data = await lessons.findAll({ where: { userAccountId: req.user.id } })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// get data by id
exports.getLessonsById = async (req, res, next) => { // used in teacherProfile
  try {
    const { id } = req.params;
    const data = await lessons.findAll({ where: { teacherProfileId: id } })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// create data
exports.createLessons = async (req, res, next) => {
  try {
    const { intoduceContent, presentText, aboutTeacher, recommendLesson, ableBooking, ableContact } = req.body;
    const data = await lessons.create({
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
exports.updateLessons = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { intoduceContent, presentText, aboutTeacher, ableBooking, ableContact } = req.body;
    const [rows] = await lessons.update({ ...req.body }, {
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
exports.deleteLessons = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await lessons.destroy({
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
