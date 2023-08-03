const express = require('express')
const { userRouter } = require('./user.route')
const { postRouter } = require('./post.route')
const { commentRouter } = require('./comment.route')
const { fileRouter } = require('./file.route')

const router = express.Router()

router.use('/users', userRouter)
router.use('/posts', postRouter)
router.use('/comments', commentRouter)
router.use('/file-upload', fileRouter)

module.exports = {
	router
}
