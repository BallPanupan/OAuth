const jwt = require('jsonwebtoken')

async function GenerateAccessToken(data) {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN
  })
}

module.exports = GenerateAccessToken