const { languageSpeak } = require("../models")

// get all data
exports.getAllLanguageSpeak = async (req, res, next) => {
  try {
    const data = await languageSpeak.findAll({ where: { userAccountId: req.user.id } })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// get data by id
exports.getLanguageSpeakById = async (req, res, next) => { // used in teacherProfile
  try {
    const { id } = req.params;
    const data = await languageSpeak.findAll({ where: { userAccountId: id } })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// create data
exports.createLanguageSpeak = async (req, res, next) => { //used in learnForm teacherForm
  try {
    const { language } = req.body;
    const data = await languageSpeak.create({
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
exports.updateLanguageSpeak = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { intoduceContent, presentText, aboutTeacher, ableBooking, ableContact } = req.body;
    const [rows] = await languageSpeak.update({ ...req.body }, {
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
exports.deleteLanguageSpeak = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await languageSpeak.destroy({
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
