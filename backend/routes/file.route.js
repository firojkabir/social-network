const express = require('express')

const { uploadFile } = require('../controllers/file.controller')

const router = express.Router()

router.post('/', uploadFile)

module.exports = {
	fileRouter: router
}
