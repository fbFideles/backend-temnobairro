const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/v1/seller', require('./routes/SellerRoutes'))
app.use('/api/v1/commerce', require('./routes/CommerceRoutes'))

module.exports = app