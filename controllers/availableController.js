const { available, teacherProfile } = require("../models")

// get all data
exports.getAllAvailable = async (req, res, next) => {
  try {
    //prepare data
    // const teacherProfileFound = await teacherProfile.findOne({ where: { userAccountId: req.user.id } })
    const data = await available.findAll({
      include: {
        association: 'teacherProfile'
      }
    })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// get data by id
exports.getAvailableById = async (req, res, next) => {
  try {
    const { id } = req.params;
    //prepare data
    const data = await available.findAll({ where: { teacherProfileId: id } })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// create data
exports.createAvailable = async (req, res, next) => { // used in availablecalendar
  try {
    console.log('create')
    const { startAvailableTime, endAvailableTime } = req.body;
    //prepare data
    const teacherProfileFound = await teacherProfile.findOne({ where: { userAccountId: req.user.id } })
    //create
    const data = await available.create({
      ...req.body,
      teacherProfileId: teacherProfileFound.id
    })
    res.status(201).json({ data })
  }
  catch (err) {
    next(err)
  }
}

// update data by id
exports.updateAvailable = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { startAvailableTime, endAvailableTime } = req.body;
    //prepare data
    const teacherProfileFound = await teacherProfile.findOne({ where: { userAccountId: req.user.id } })
    const [rows] = await available.update({ ...req.body }, {
      where: {
        id,
        teacherProfileId: teacherProfileFound.id
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
exports.deleteAvailable = async (req, res, next) => { // used in availablecalendar
  try {
    const { id } = req.params;
    const rows = await available.destroy({
      where: {
        teacherProfileId: id
      }
    })
    // if (rows === 0) return res.status(400).json({ message: 'Delete is failed' })
    res.status(204).json()
  }
  catch (err) {
    next(err)
  }
}
