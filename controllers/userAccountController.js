const { userAccount } = require("../models")
const multer = require('multer')
const cloudinary = require('cloudinary').v2;
const fs = require('fs')

// get all data
exports.getAllUserAccount = async (req, res, next) => {
  try {
    const data = await userAccount.findAll()
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// get data by params id
exports.getUserAccountById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await userAccount.findOne({
      where: { id },
      attributes: { exclude: ['password'] }
    })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// create data
exports.createUserAccount = async (req, res, next) => {
  try {
    const { intoduceContent, presentText, aboutTeacher, recommendLesson, ableBooking, ableContact } = req.body;
    const data = await userAccount.create({
      ...req.body,
      userAccountId: req.user.id
    })
    res.status(201).json({ data })
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
exports.uploadCloud = uploadCloud.single('profilePicture')

// update data by id
exports.updateUserAccount = async (req, res, next) => { //usde in learnerProfile
  try {
    let profilePicture = ''
    req.file && await cloudinary.uploader.upload(req.file.path, async (err, result) => { // picture case
      if (err) console.log(`err`, err)
      // else console.log(`result`, result)
      fs.unlinkSync(req.file.path)
      profilePicture = result.secure_url
    })

    const [rows] = await userAccount.update({ profilePicture }, {
      where: {
        id: req.user.id
      }
    })
    if (rows === 0) return res.status(400).json({ message: 'Update is failed' })
    res.json({ message: 'Update is successful' })
  }
  catch (err) {
    next(err)
  }
}

exports.updateCredit = async (req, res, next) => { //usde in learnerProfile
  try {
    const { credit } = req.body
    const user = await userAccount.findOne({ where: { id: req.user.id } })
    const [rows] = await userAccount.update({ credit: +user.credit + +credit }, {
      where: {
        id: req.user.id
      }
    })
    if (rows === 0) return res.status(400).json({ message: 'Update is failed' })
    res.json({ message: 'Update is successful' })
  }
  catch (err) {
    next(err)
  }
}

exports.updateXP = async (req, res, next) => { //usde in learnerProfile
  try {
    const { xp } = req.body
    console.log(`xp`, xp)
    const user = await userAccount.findOne({ where: { id: req.user.id } })
    console.log(`user.studentPoint`, user.studentPoint)
    const [rows] = await userAccount.update({ studentPoint: +user.studentPoint + +xp }, {
      where: {
        id: req.user.id
      }
    })
    if (rows === 0) return res.status(400).json({ message: 'Update is failed' })
    res.json({ message: 'Update is successful' })
  }
  catch (err) {
    next(err)
  }
}

exports.updateReadMessage = async (req, res, next) => { //usde in learnerProfile
  try {
    const { readMessage } = req.body
    const [rows] = await userAccount.update({ readMessage }, {
      where: {
        id: req.user.id
      }
    })
    // if (rows === 0) return res.status(400).json({ message: 'Update is failed' })
    res.json({ message: 'Update is successful' })
  }
  catch (err) {
    next(err)
  }
}

// delete data by id
exports.deleteUserAccount = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await userAccount.destroy({
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

