require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser')
const port = 3000
const jwt = require('jsonwebtoken')
const { CheckRefToken } = require('./module/CheckRefToken')
const { CheckUser } = require('./module/CheckUser')
const { DeleteLoginToken } = require('./module/DeleteLoginToken')
const { InsertLoginToken } = require('./module/InsertLoginToken')
const { Register } = require('./module/Register')

// express app
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})