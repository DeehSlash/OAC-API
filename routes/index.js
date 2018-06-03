// Modules
const express = require('express')
const router = express.Router()

// Controllers
const mainController = require('../controllers/main-controller')


router.get('/', (req, res) => {
  res.status(200).send('Welcome to OAC-API')
})

router.post('/network', (req, res) => {
  mainController.createNetwork(req.body)
    .then(code => {
      res.status(201).send(code)
    })
    .catch(e => {
      res.status(500).send(e.message)
    })
})


module.exports = router
