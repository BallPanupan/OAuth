const jwt = require('jsonwebtoken')

// Generate Refresh Token
function GenerateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { 
		expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN 
	});
}

module.exports = GenerateRefreshToken