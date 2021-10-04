require('dotenv').config()
const cors = require('cors')
const express = require('express')
const teacherProfileRouter = require('./routers/teacherProfileRouter')
const { sequelize } = require('./models');
const userRouter = require('./routers/userRouter');
const availableRouter = require('./routers/availableRouter')
const commentReplyRouter = require('./routers/commentReplyRouter')
const creditCardRouter = require('./routers/creditCardRouter')
const exchangeGroupRouter = require('./routers/exchangeGroupRouter')
const followerRouter = require('./routers/followerRouter')
const groupFeedRouter = require('./routers/groupFeedRouter')
const groupPostCommentRouter = require('./routers/groupPostCommentRouter')
const groupPostCommentReplyRouter = require('./routers/groupPostCommentReplyRouter')
const languageSpeakRouter = require('./routers/languageSpeakRouter')
const learnerProfileRouter = require('./routers/learnerProfileRouter')
const learnerSkillRouter = require('./routers/learnerSkillRouter')
const lessonOptionRouter = require('./routers/lessonOptionRouter')
const lessonsRouter = require('./routers/lessonsRouter')
const postCommentRouter = require('./routers/postCommentRouter')
const profilePostRouter = require('./routers/profilePostRouter')
const promotionCodeRouter = require('./routers/promotionCodeRouter')
const reviewsRouter = require('./routers/reviewsRouter')
const teacherSubjectRouter = require('./routers/teacherSubjectRouter')
const userAccountRouter = require('./routers/userAccountRouter')
const userFriendRouter = require('./routers/userFriendRouter')
const userGroupRouter = require('./routers/userGroupRouter')
const userMessageRouter = require('./routers/userMessageRouter')
const lessonsRecordRouter = require('./routers/lessonsRecordRouter')

// sequelize.sync({ force: true });

const app = express();
app.use(cors())

app.use(express.json()) //?parse request body to object

app.use(express.static('/public'))

//? Routers
app.use('/', userRouter)
app.use('/teacherProfile', teacherProfileRouter)
app.use('/available', availableRouter)
app.use('/commentReply', commentReplyRouter)
app.use('/creditCard', creditCardRouter)
app.use('/exchangeGroup', exchangeGroupRouter)
app.use('/follower', followerRouter)
app.use('/following', teacherProfileRouter)
app.use('/groupFeed', groupFeedRouter)
app.use('/groupPostComment', groupPostCommentRouter)
app.use('/groupPostCommentReply', groupPostCommentReplyRouter)
app.use('/languageSpeak', languageSpeakRouter)
app.use('/learnerProfile', learnerProfileRouter)
app.use('/learnerSkill', learnerSkillRouter)
app.use('/lessonOption', lessonOptionRouter)
app.use('/lessonsRecord', lessonsRecordRouter)
app.use('/lessons', lessonsRouter)
app.use('/postComment', postCommentRouter)
app.use('/profilePost', profilePostRouter)
app.use('/promotionCode', promotionCodeRouter)
app.use('/reviews', reviewsRouter)
app.use('/teacherSubject', teacherSubjectRouter)
app.use('/userAccount', userAccountRouter)
app.use('/userFriend', userFriendRouter)
app.use('/userGroup', userGroupRouter)
app.use('/userMessage', userMessageRouter)


//? handle path and method not found
app.use((req, res, next) => {
  res.status(404).json({ message: 'this is resource is not found' })
})

//? handle all error
app.use((err, req, res, next) => {
  res.status(404).json({ message: err.message })
})

app.listen(9000, () => console.log('Server is running on port 9000'))