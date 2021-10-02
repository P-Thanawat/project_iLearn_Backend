const { learnerProfile } = require("../models")

// get all data
exports.getAllLearnerProfile = async (req, res, next) => {
  try {
    const data = await learnerProfile.findAll({ where: { userAccountId: req.user.id } })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// get data by id
exports.getLearnerProfileById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await learnerProfile.findOne({ where: { id } })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// get data by user id
exports.getLearnerProfileByUserId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await learnerProfile.findOne({ where: { userAccountId: id } })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// create data
exports.createLearnerProfile = async (req, res, next) => {
  try {
    console.log(`req.user`, req.user)
    const { learnerAbouteMe } = req.body;
    const data = await learnerProfile.create({
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
exports.updateLearnerProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { intoduceContent, presentText, aboutTeacher, ableBooking, ableContact } = req.body;
    const [rows] = await learnerProfile.update({ ...req.body }, {
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
exports.deleteLearnerProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await learnerProfile.destroy({
      where: {
        userAccountId: id
      }
    })
    if (rows === 0) return res.status(400).json({ message: 'Delete is failed' })
    res.status(204).json()
  }
  catch (err) {
    next(err)
  }
}
