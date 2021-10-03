const { teacherProfile } = require("../models")
const multer = require('multer')
const cloudinary = require('cloudinary').v2;
const fs = require('fs')


// get all data
exports.getAllTeacherProfile = async (req, res, next) => {
  try {
    const data = await teacherProfile.findAll({ where: { userAccountId: req.user.id } })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// get data by id
exports.getTeacherProfileById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(`id`, id)
    const data = await teacherProfile.findOne({ where: { id } })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}

// get data by useraccount id
exports.getTeacherProfileByUserId = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(`id`, id)
    const data = await teacherProfile.findOne({ where: { userAccountId: id } })
    res.json({ data })
  }
  catch (err) {
    next(err)
  }
}
//*upload file to local 
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(`file`, file) //? fieldname originalname encoding mimetype
      cb(null, 'public/images') //? select storage folder
    },
    filename: (req, file, cb) => {
      cb(null, `${new Date().getTime()}.${file.mimetype.split('/')[1]}`) //? select file name
    }

  })
})

//*upload file to cloud (cloudinery)
exports.uploadCloud = upload.single('introduceContent')
// create data
exports.createTeacherProfile = async (req, res, next) => {
  try {
    console.log(`req.file`, req.file)
    const { presentText, aboutTeacher, recommendLesson, ableBooking, ableContact } = req.body;
    let introduceContent = null;
    req.file && await cloudinary.uploader.upload(req.file.path, async (err, result) => { // picture case
      if (err) console.log(`err`, err)
      else console.log(`result`, result)
      fs.unlinkSync(req.file.path)
      introduceContent = result.secure_url
      console.log(`introduceContent`, introduceContent)
    })
    const data = await teacherProfile.create({
      ...req.body,
      introduceContent,
      userAccountId: req.user.id
    })
    res.status(201).json({ data })
  }
  catch (err) {
    next(err)
  }
}

// update data by id
exports.updateTeacherProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { introduceContent, presentText, aboutTeacher, ableBooking, ableContact } = req.body;
    const [rows] = await teacherProfile.update({ ...req.body }, {
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
exports.deleteTeacherProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await teacherProfile.destroy({
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



