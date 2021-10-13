const { profilePost, userAccount } = require("../models")
const multer = require('multer')
const cloudinary = require('cloudinary').v2;
const fs = require('fs')

// get all data
exports.getAllProfilePost = async (req, res, next) => {
  try {
    const data = await profilePost.findAll({ where: { userAccountId: req.user.id } })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// get data by id
exports.getProfilePostById = async (req, res, next) => { // used in learnprofile
  try {
    const { id } = req.params;
    const data = await profilePost.findAll({
      where: { learnerProfileId: id },
      include: {
        model: userAccount,
        as: 'postUser',
        attributes: { exclude: ['password'] }
      }
    })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

//*upload file to local 
const uploadCloud = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(`file`, file) //? fieldname originalname encoding mimetype
      cb(null, 'public/images') //? select storage folder
    },
    filename: (req, file, cb) => {
      cb(null, `${new Date().getTime()}.${file.mimetype.split('/')[1]}`) //? select file name
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    }

  })
})

//*upload file to cloud (cloudinery)
exports.uploadCloud = uploadCloud.single('postPicture')

// create data
exports.createProfilePost = async (req, res, next) => { //used in learnProfile
  try {
    const { postContent, learnerProfileId, userAccountId } = req.body;
    console.log(`req.file`, req.file)
    let postPicture = ''
    req.file && await cloudinary.uploader.upload(req.file.path, async (err, result) => { // picture case
      if (err) console.log(`err`, err)
      else console.log(`result`, result)
      // fs.unlinkSync(req.file.path)
      postPicture = result.secure_url
    })


    const data = await profilePost.create({
      postContent,
      postPicture: postPicture ?? null,
      learnerProfileId,
      userAccountId,
    })
    res.status(201).json({ data })
  }
  catch (err) {
    next(err)
  }
}

// update data by id
exports.updateProfilePost = async (req, res, next) => { //used in learnprofile
  try {
    const { postContent, learnerProfileId, userAccountId } = req.body;
    let postPicture = ''
    req.file && await cloudinary.uploader.upload(req.file.path, async (err, result) => { // picture case
      if (err) console.log(`err`, err)
      else console.log(`result`, result)
      fs.unlinkSync(req.file.path)
      postPicture = result.secure_url
    })
    if (!postPicture) {
      const [rows] = await profilePost.update({
        postContent,
      }, {
        where: {
          learnerProfileId,
          userAccountId
        }
      })
    }
    if (postPicture) {
      const [rows] = await profilePost.update({
        postContent,
        postPicture
      }, {
        where: {
          learnerProfileId,
          userAccountId
        }
      })
    }
    // if (rows === 0) return res.status(400).json({ message: 'Update is failed' })
    res.json({ message: 'Update is successful' })
  }
  catch (err) {
    next(err)
  }
}

// delete data by id
exports.deleteProfilePost = async (req, res, next) => { //used in learnerProfile
  try {
    const { id } = req.params;
    const rows = await profilePost.destroy({
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
