const jsonwebtoken = require("jsonwebtoken");
const { CheckRefTokenexpired } = require("./module/CheckRefToken");
const GenerateAccessToken = require("./module/GenerateAccessToken");
const GenerateRefreshToken = require("./module/GenerateRefreshToken");
const RefreshToken = require("../../models/RefreshTokenSchema");
const { SaveRefreshToken } = require("./module/InsertLoginToken");

// helper
async function refreshTokenIsOld(refreshTokenExpired) {
	try {
		const currentTime = new Date();
		const elapsedTime = currentTime - refreshTokenExpired;
		const refreshTokenLifetime = 1000 * 60 * 60 * 24 * 30; // Assuming refreshToken lasts for 30 days
		return elapsedTime > (0.4 * refreshTokenLifetime);
	} catch (error) {
		return false
	}
}

async function _refreshToken(req, res) {
	try {
		const customError = `Refresh token has expired`;
		const authHeader = req.body.refreshToken;
		const refreshToken = authHeader && authHeader.split(' ')[1]
		if (!refreshToken || refreshToken == null) throw new Error(customError);

		const decoded = await jsonwebtoken.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		const currentTimestamp = Math.floor(Date.now() / 1000); // Get current time in seconds
		if (decoded.exp < currentTimestamp) {
			throw new Error(customError);
		}

		const tokenExpired = await CheckRefTokenexpired(refreshToken);
		if (tokenExpired || tokenExpired === true) throw new Error(customError);

		const username = {
			id: decoded.id,
			username: decoded.username,
		}

		// generate new accessToken
		const accessToken = await GenerateAccessToken(username);

		// new ref token and force refreshToken expired after generate new
		// const lessRefreshToken = await refreshTokenIsOld(decoded.exp);
		const lessRefreshToken = true; // Example condition for demonstration
		const newRefreshToken = await GenerateRefreshToken(username); // Assuming GenerateRefreshToken function generates a new refresh token

		if (lessRefreshToken) {
			try {
				// Expire existing refreshToken(s)
				const forceToken = await RefreshToken.updateMany(
					{ refreshToken: refreshToken },
					{ $set: { expired: true } }
				).lean();

				// Save new refresh token
				const saveRefToken = await SaveRefreshToken({
					userId: decoded.id,
					refreshToken: newRefreshToken,
				});
			} catch (error) {
				console.error('Error updating or saving tokens:', error.message);
				// Handle error as needed
			}
		}
		
		const result = {
			accessToken: accessToken,
			refreshToken: !lessRefreshToken ? refreshToken : newRefreshToken,
			status: true
		};
		return res.json(result);
	} catch (error) {
		console.log('refreshToken: ', error.message);
		return res.status(401).json({
			message: error.message,
			status: false
		})
	}
}

module.exports = {
	_refreshToken
}