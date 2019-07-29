const { list } = require('../controller/countryController')
const { Router } = require('express')
const router = Router()

// Route for current country and random country
router.get('/country', list)


module.exports = router