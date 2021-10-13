const { lessons, teacherProfile, userAccount } = require("../models")
const multer = require('multer')
const cloudinary = require('cloudinary').v2;
const fs = require('fs')

// get all data
exports.getAllLessons = async (req, res, next) => { // used in home
  try {
    const data = await lessons.findAll({
      include: {
        model: teacherProfile,
        include: {
          model: userAccount,
          attributes: { exclude: ['password'] }
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
exports.getLessonsById = async (req, res, next) => { // used in teacherProfile app 
  try {
    const { id } = req.params;
    const data = await lessons.findAll({ where: { teacherProfileId: id } })
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
exports.uploadCloud = uploadCloud.single('lessonPicutre')
// create data
exports.createLessons = async (req, res, next) => { //used in lessonForm
  try {
    const { lessonName, lessonDetail, firstTypeTag, secondTypeTag, thirdTypeTag } = req.body;
    let lessonPicutre = ''
    req.file && await cloudinary.uploader.upload(req.file.path, async (err, result) => { // picture case
      if (err) console.log(`err`, err)
      else console.log(`result`, result)
      fs.unlinkSync(req.file.path)
      lessonPicutre = result.secure_url
    })
    const teacherProfileData = await teacherProfile.findOne({ where: { userAccountId: req.user.id } })
    const data = await lessons.create({
      ...req.body,
      lessonPicutre,
      teacherProfileId: teacherProfileData.id
    })
    res.status(201).json({ data })
  }
  catch (err) {
    next(err)
  }
}

// update data by id
exports.updateLessons = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { lessonName, lessonDetail, firstTypeTag, secondTypeTag, thirdTypeTag } = req.body;
    let lessonPicutre = ''
    req.file && await cloudinary.uploader.upload(req.file.path, async (err, result) => { // picture case
      if (err) console.log(`err`, err)
      else console.log(`result`, result)
      fs.unlinkSync(req.file.path)
      lessonPicutre = result.secure_url
    })

    const [rows] = await lessons.update({
      lessonName,
      lessonDetail,
      lessonPicutre: lessonPicutre ?? null,
      firstTypeTag,
      secondTypeTag,
      thirdTypeTag
    }, {
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
exports.deleteLessons = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await lessons.destroy({
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
