const { lessonsRecord, lessons, teacherProfile, userAccount } = require("../models")


// get all data
exports.getAllLessonsRecord = async (req, res, next) => { //used in app
  try {
    const data = await lessonsRecord.findAll({
      where: { userAccountId: req.user.id },
      include: { model: lessons }
    })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// get data by teacherProfileId id
exports.getLessonsRecordById = async (req, res, next) => { //used in teacherProfile bookingcalendar
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

// get data by userAccount id
exports.getLessonsRecordByUserAccountId = async (req, res, next) => { //used in learnPRofile
  try {
    const { id } = req.params;
    const data = await lessonsRecord.findAll({
      where: {
        userAccountId: id
      },
      include: {
        model: lessons,
        include: {
          model: teacherProfile,
          include: {
            model: userAccount,
            attributes: { exclude: ['password'] }
          }
        }
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
    const { startLearnTime, endLearnTime, completed, userAccountId, lessonsId } = req.body;
    const data = await lessonsRecord.create({
      startLearnTime,
      endLearnTime,
      completed,
      userAccountId,
      lessonsId
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
    const { completed } = req.body;
    const [rows] = await lessonsRecord.update({
      completed: true,

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
