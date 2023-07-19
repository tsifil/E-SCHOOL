const express = require('express')
const router = express.Router()
const publicationController = require('../../controllers/actions/publicationController')
router.post('/Admin/publier_Note',publicationController.PublierNote)
module.exports = router
