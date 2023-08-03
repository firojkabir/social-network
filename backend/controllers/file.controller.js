const fs = require('fs')
const { fileUploadMiddleware } = require('../middlewares/file.middleware')

const uploadFile = async (req, res) => {
	try {
		await fileUploadMiddleware(req, res)

		if (req.file == undefined) {
			return res.status(400).json({
				message: `Please upload a file!`
			})
		}

		res.status(200).send({
			message: `Uploaded the file successfully ${req.file.originalname}`
		})
	} catch (err) {
		res.status(500).json({
			message: `Could not upload the files, '${err}!'`
		})
	}
}

module.exports = {
	uploadFile
}
