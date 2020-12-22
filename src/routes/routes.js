var express = require('express')
const router = express.Router()
const services = require('../services/services')

router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

router.get('/sample', services.sample)
router.get('/authentication', services.authentication)
router.get('/getDraws', services.getDraws)

module.exports = router;