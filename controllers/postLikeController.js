const { postLike, profilePost, learnerProfile } = require("../models")

// get all data
exports.getAllPostLike = async (req, res, next) => {
  try {
    const data = await postLike.findAll({ where: { userAccountId: req.user.id } })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// get data by id
exports.getPostLikeById = async (req, res, next) => { // used in learnprofile
  try {
    const { id } = req.params;
    const data = await postLike.findAll({
      where: { '$profilePost.learnerProfile.id$': id },
      include: {
        model: profilePost,
        include: {
          model: learnerProfile
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
exports.createPostLike = async (req, res, next) => { //used in learnerProfile
  try {
    const { userAccountId, profilePostId } = req.body;
    const data = await postLike.create({
      userAccountId,
      profilePostId
    })
    res.status(201).json({ data })
  }
  catch (err) {
    next(err)
  }
}

// update data by id
exports.updatePostLike = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userAccountId, profilePostId } = req.body;
    const [rows] = await postLike.update({}, {
      where: {
        userAccountId,
        profilePostId

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
exports.deletePostLike = async (req, res, next) => { //used in learnerProfile
  try {
    const { id } = req.params;
    console.log(`req.user.id`, req.user.id)
    console.log(`profilePostId`, id)
    const rows = await postLike.destroy({
      where: {
        userAccountId: req.user.id,
        profilePostId: id
      }
    })
    if (rows === 0) return res.status(400).json({ message: 'Delete is failed' })
    res.status(204).json()
  }
  catch (err) {
    next(err)
  }
}
