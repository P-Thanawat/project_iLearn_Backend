const { postComment, profilePost, userAccount } = require("../models")

// get all data
exports.getAllPostComment = async (req, res, next) => {
  try {
    const data = await postComment.findAll({ where: { userAccountId: req.user.id } })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// get data by profilePost id
exports.getPostCommentById = async (req, res, next) => { // used in learnerPRofile
  try {
    const { id } = req.params;
    const data = await postComment.findAll({
      where: { '$profilePost.learner_profile_id$': id },
      include: [
        {
          model: profilePost
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
exports.createPostComment = async (req, res, next) => { // used in learnerProfile
  try {
    const { commentContent, profilePostId } = req.body;
    const data = await postComment.create({
      commentContent,
      profilePostId,
      userAccountId: req.user.id
    })
    res.status(201).json({ data })
  }
  catch (err) {
    next(err)
  }
}

// update data by id
exports.updatePostComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(`id`, id)
    const { commentContent } = req.body;
    console.log(`commentContent`, commentContent)
    const [rows] = await postComment.update({ commentContent }, {
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
exports.deletePostComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await postComment.destroy({
      where: {
        id,
      }
    })
    if (rows === 0) return res.status(400).json({ message: 'Delete is failed' })
    res.status(204).json()
  }
  catch (err) {
    next(err)
  }
}
