const { lessonOption } = require("../models")

// get all data
exports.getAllLessonOption = async (req, res, next) => {
  try {
    const data = await lessonOption.findAll({ where: { userAccountId: req.user.id } })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// get data by id
exports.getLessonOptionById = async (req, res, next) => { // used in taecherProfile
  try {
    const { id } = req.params;
    const data = await lessonOption.findAll({ where: { lessonsId: id }, include: { all: true } })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// create data
exports.createLessonOption = async (req, res, next) => { // used in lessonForm
  try {
    const { lessonTime, lessonPrice, numberOfLesson, promotionPrice, lessonsId } = req.body;
    const data = await lessonOption.create({
      ...req.body,
      lessonsId: lessonsId
    })
    res.status(201).json({ data })
  }
  catch (err) {
    next(err)
  }
}

// update data by id
exports.updateLessonOption = async (req, res, next) => {
  try {
    const { id } = req.params
    const { lessonTime, lessonPrice, numberOfLesson, promotionPrice } = req.body;
    const [rows] = await lessonOption.update({
      lessonTime,
      lessonPrice,
      numberOfLesson,
      promotionPrice
    }, {
      where: {
        id
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
exports.deleteLessonOption = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await lessonOption.destroy({
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
