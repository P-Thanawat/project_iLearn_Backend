const bcrypt = require('bcrypt')
const { userAccount } = require('../models')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const cloudinary = require('cloudinary').v2;
const fs = require('fs')


exports.authenticate = async (req, res, next) => { //* input data to userAccount by decording token
  try {
    console.log('auth1')
    const { authorization } = req.headers; //? header request
    console.log(`authorization`, authorization)
    if (!authorization || !authorization.startsWith('Bearer')) return res.status(401).json({ message: 'you are unauthorizations' });
    const token = authorization.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'you are unauthorizationsss' });
    console.log(`process.env.JWT_SECRET_KEY`, process.env.JWT_SECRET_KEY)
    const decorded = jwt.verify(token, process.env.JWT_SECRET_KEY); //? process.env.SECRET_KEY is global
    console.log(`decorded`, decorded)
    const user = await userAccount.findOne({ where: { id: decorded.id } })
    if (!user) return res.status(401).json({ message: 'you are unauthorizationsss' });
    req.user = user;
    console.log('auth2')
    next();
  }
  catch (err) {
    next(err)
  }

}

exports.checkEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await userAccount.findOne({
      where: {
        email
      }
    })
    res.json({ data: user ? true : false })
  }
  catch (err) {
    next(err)
  }
}

exports.login = async (req, res, next) => { //* LOGIN
  try {
    console.log("here")
    const { email, password, remember } = req.body //? user input email and password
    const user = await userAccount.findOne({ //? select usersAccount data by email
      where: {
        email
      }
    })
    if (!user) res.status(400).json({ message: 'username or password incorrecta' }) //? email incorrect
    console.log(`password`, password)
    console.log(`user.password`, user.password)

    const isCorrectPassword = await bcrypt.compare(password, user.password) //? check password
    if (!isCorrectPassword) res.status(400).json({ message: 'username or password incorrectaa' }) //? password incorrect

    const payload = { //? detail in token
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      studentPoint: user.studentPoint ?? null,
      profilePicture: user.profilePicture,
      typeAccount: user.typeAccount
    }

    const token = jwt.sign(payload, 'password', { expiresIn: remember ? 60 * 60 * 24 * 30 : 60 * 60 }) //? make 30day token 
    res.json({ message: 'login succussfully', token }) //? send token to client

  }
  catch (err) {
    next(err)
  }
}

// exports.register = async (req, res, next) => {
//   try {
//     const { typeAccount, firstName, lastName, birthDate, email, password, confirmPassword, profilePicture, livingArea } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 12);
//     if (password !== confirmPassword) return res.status(400).json({ message: 'password and confirm password are not match' })
//     await userAccount.create({
//       typeAccount,
//       firstName,
//       lastName,
//       birthDate,
//       email,
//       profilePicture: profilePicture ?? 'defaultURL',
//       password: hashedPassword,
//       livingArea: livingArea ?? null
//     })
//     res.json({ message: `created successfully` })
//   }
//   catch (err) {
//     next(err)
//   }
// }
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
exports.uploadCould = uploadCloud.single('profilePicture')
exports.register = async (req, res, next) => {
  try {
    console.log(`req.file`, req.file)
    const { typeAccount, firstName, lastName, birthDate, email, password, confirmPassword, livingArea } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    if (password !== confirmPassword) return res.status(400).json({ message: 'password and confirm password are not match' })
    let profilePicture = '';
    req.file && await cloudinary.uploader.upload(req.file.path, async (err, result) => { // picture case
      if (err) console.log(`err`, err)
      else console.log(`result`, result)
      fs.unlinkSync(req.file.path)
      profilePicture = result.secure_url
    })
    console.log(`profilePicture`, profilePicture)
    await userAccount.create({ //no picture case
      ...req.body,
      studentPoint: 0,
      password: hashedPassword,
      profilePicture: profilePicture ?? null
    })

    const user = await userAccount.findOne({ //? select usersAccount data by email
      where: {
        email
      }
    })
    console.log(`user`, user)

    res.status(201).json({ user: user.id })
  }
  catch (err) {
    next(err)
  }
}

exports.delete = async (req, res, next) => {
  try {
    await authen.destroy({ truncate: true })
    res.json({ message: 'success' });
  }
  catch (err) {
    next(err)
  }
}