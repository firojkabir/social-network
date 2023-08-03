const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		postId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post'
		},
		content: {
			type: String,
			trim: true,
			required: true
		}
	},
	{ timestamps: true }
)

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = { Comment }
