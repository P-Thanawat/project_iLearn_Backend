const { lessonsRecord, lessons } = require("../models")

// get all data
exports.getAllLessonsRecord = async (req, res, next) => {
  try {
    const data = await lessonsRecord.findAll({ where: { userAccountId: req.user.id } })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// get data by id
exports.getLessonsRecordById = async (req, res, next) => { //used in teacherProfile
  try {
    const { id } = req.params;
    const data = await lessonsRecord.findAll({
      where: {
        '$lesson.teacherProfile.id$': id
      },
      include: {
        association: 'lesson',
        include: 'teacherProfile'
      }

    })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// create data
exports.createLessonsRecord = async (req, res, next) => {
  try {
    const { intoduceContent, presentText, aboutTeacher, recommendLesson, ableBooking, ableContact } = req.body;
    const data = await lessonsRecord.create({
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
exports.updateLessonsRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { intoduceContent, presentText, aboutTeacher, ableBooking, ableContact } = req.body;
    const [rows] = await lessonsRecord.update({ ...req.body }, {
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
exports.deleteLessonsRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await lessonsRecord.destroy({
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
