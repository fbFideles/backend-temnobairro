const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/v1/seller', require('./routes/SellerRoutes'))
app.use('/api/v1/commerce', require('./routes/CommerceRoutes'))

module.exports = app