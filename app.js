const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const routes = require('./routes/index')

const app = express()

const networkService = require('./services/network-service')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Requested-With, Accept')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.use('/', routes)

networkService.extendPrototype()

module.exports = app
