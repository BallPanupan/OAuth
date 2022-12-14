const jwt = require('jsonwebtoken')

exports.generateAccessToken = (data) => {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'})
}