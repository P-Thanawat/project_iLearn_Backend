const { teacherSubject } = require("../models")

// get all data
exports.getAllTeacherSubject = async (req, res, next) => {
  try {
    const data = await teacherSubject.findAll({ where: { userAccountId: req.user.id } })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// get data by teacherProfile id
exports.getTeacherSubjectById = async (req, res, next) => { //used in teacherProfile
  try {
    const { id } = req.params;
    const data = await teacherSubject.findAll({ where: { teacherProfileId: id } })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// create data
exports.createTeacherSubject = async (req, res, next) => {
  try {
    const { subject, teacherProfileId } = req.body;
    console.log(`teacherProfileId`, teacherProfileId)
    const data = await teacherSubject.create({
      subject,
      teacherProfileId,
    })
    res.status(201).json({ data })
  }
  catch (err) {
    next(err)
  }
}

// update data by id
exports.updateTeacherSubject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { intoduceContent, presentText, aboutTeacher, ableBooking, ableContact } = req.body;
    const [rows] = await teacherSubject.update({ ...req.body }, {
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
exports.deleteTeacherSubject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await teacherSubject.destroy({
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
