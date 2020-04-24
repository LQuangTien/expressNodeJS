const express = require('express')
const controller = require('../controllers/product.controller')

var router = express.Router()

router.get('/', controller.index)
router.get('/:page', controller.index)
module.exports = router

