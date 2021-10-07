const { reviews, lessons } = require("../models")

// get all data
exports.getAllReviews = async (req, res, next) => {
  try {
    const data = await reviews.findAll({ where: { userAccountId: req.user.id } })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// get data by id
exports.getReviewsById = async (req, res, next) => { //used in tacheProfile
  try {
    const { id } = req.params;
    const data = await reviews.findAll({
      where: { lessonsId: id },
      include: [
        {
          association: 'userAccount',
          attributes: { exclude: ['password'] }
        },
        lessons
      ]

    })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// create data
exports.createReviews = async (req, res, next) => {
  try {
    const { reviewPoint, reviewMessage, fisrtTag, secondTag, thirdTag, lessonsId, userAccountId } = req.body;
    const data = await reviews.create({
      reviewPoint,
      reviewMessage,
      fisrtTag,
      secondTag,
      thirdTag,
      lessonsId,
      userAccountId,
    })
    res.status(201).json({ data })
  }
  catch (err) {
    next(err)
  }
}

// update data by id
exports.updateReviews = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { intoduceContent, presentText, aboutTeacher, ableBooking, ableContact } = req.body;
    const [rows] = await reviews.update({ ...req.body }, {
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
exports.deleteReviews = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await reviews.destroy({
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
