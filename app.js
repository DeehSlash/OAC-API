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

app.use('/', routes)

networkService.extendPrototype()

module.exports = app
