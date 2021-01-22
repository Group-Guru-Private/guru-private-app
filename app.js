if(process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express')
const app = express()
const routes = require('./routes')
const errorHandler = require('./middleware/errorhandler')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(routes)
app.use(errorHandler)

module.exports = app