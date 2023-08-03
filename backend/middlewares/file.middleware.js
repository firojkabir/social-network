const util = require('util')
const multer = require('multer')

const maxFileSize = 2 * 1024 * 1024

let storage = multer.diskStorage({
	destination: (req, res, cb) => {
		cb(null, __basedir + '/assets/uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	}
})

let uploadFile = multer({
	storage: storage,
	limits: { fileSize: maxFileSize }
}).single('file')

let fileUploadMiddleware = util.promisify(uploadFile)

module.exports = { fileUploadMiddleware }
