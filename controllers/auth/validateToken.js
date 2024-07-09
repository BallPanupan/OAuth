const jsonwebtoken = require("jsonwebtoken");
const RefreshToken = require("../../models/RefreshTokenSchema");

async function _validateToken(req, res) {
	try {
		let customError = {
			username: '',
			message: '',
			status: false,
		}
		const authHeader = req.headers['authorization']
		const token = authHeader && authHeader.split(' ')[1]
		const tikenDecoded = await jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET);
		const resultToken = await RefreshToken.find({ accessToken: token }).lean();
		const expiredToken = resultToken.find(token => token.expired);
		if (!token) {
			customError.username = tikenDecoded.username;
			customError.message = 'refreshToken is null';
			throw customError;
		}
		if (expiredToken && expiredToken.expired) {
			customError.username = tikenDecoded.username;
			customError.message = 'accessToken is expired.';
			throw customError;
		};
		return res.json({
			statue: true
		})
	} catch (error) {
		console.error(`\x1b[31m[validateToken]\x1b[0m`, error);
		return res.status(401).json(error);
	}
}

module.exports = {
	_validateToken,
};
