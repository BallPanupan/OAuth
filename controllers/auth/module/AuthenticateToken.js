const jsonwebtoken = require("jsonwebtoken")

async function AuthenticateToken(req, res, next) {
	try {
		const authHeader = req.headers['authorization']
		const token = authHeader && authHeader.split(' ')[1]
		if (token == null) return res.sendStatus(401)
		jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
			if (err) throw new Error('Token is expired')
			req.user = user
			next()
		})
	} catch(err) {
		return res.status(403).json({
			message: err.message || 'Token is expired',
			expired: true
		})
	}
}

module.exports = AuthenticateToken