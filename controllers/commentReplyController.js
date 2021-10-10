const { commentReply, teacherProfile, userAccount } = require("../models")

// get all data
exports.getAllCommentReply = async (req, res, next) => {
  try {
    const data = await commentReply.findAll({
      where: { '$postComment.profilePost.postUser.id$': req.user.id },
      include: {
        association: 'postComment',
        include: {
          association: 'profilePost',
          include: {
            association: 'postUser'
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

// get data by id
exports.getCommentReplyById = async (req, res, next) => { //used in learnerProfile
  try {
    const { id } = req.params;
    const data = await commentReply.findAll({
      where: { '$postComment.profilePost.learner_profile_id$': id },
      include: [{
        association: 'postComment',
        include: {
          association: 'profilePost',
          include: {
            association: 'learnerProfile'
          }
        }
      },
      {
        model: userAccount,
        attributes: { exclude: ['password'] }

      }
      ]
    })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// create data
exports.createCommentReply = async (req, res, next) => { //used in learnerProfile
  try {
    const { commentReplyContent, postCommentId } = req.body;
    const data = await commentReply.create({
      commentReplyContent,
      postCommentId,
      userAccountId: req.user.id
      // postCommentId: '$postComment.id$'
    })
    res.status(201).json({ data })
  }
  catch (err) {
    next(err)
  }
}

// update data by id
exports.updateCommentReply = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { startcommentReplyTime, endcommentReplyTime } = req.body;
    //prepare data
    const teacherProfileFound = await teacherProfile.findOne({ where: { userAccountId: req.user.id } })
    const [rows] = await commentReply.update({ ...req.body }, {
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
exports.deleteCommentReply = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await commentReply.destroy({
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
