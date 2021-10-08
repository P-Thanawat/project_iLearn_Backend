const { learnerSkill } = require("../models")

// get all data
exports.getAllLearnerSkill = async (req, res, next) => {
  try {
    const data = await learnerSkill.findAll({ where: { userAccountId: req.user.id } })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// get data by id
exports.getLearnerSkillById = async (req, res, next) => { // used in learnProfile
  try {
    const { id } = req.params;
    const data = await learnerSkill.findAll({ where: { learnerProfileId: id } })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// create data
exports.createLearnerSkill = async (req, res, next) => { //used in learnerProfile
  try {
    const { skill, learnerProfileId } = req.body;
    const data = await learnerSkill.create({
      skill,
      learnerProfileId
    })
    res.status(201).json({ data })
  }
  catch (err) {
    next(err)
  }
}

// update data by id
exports.updateLearnerSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { intoduceContent, presentText, aboutTeacher, ableBooking, ableContact } = req.body;
    const [rows] = await learnerSkill.update({ ...req.body }, {
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
exports.deleteLearnerSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await learnerSkill.destroy({
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
