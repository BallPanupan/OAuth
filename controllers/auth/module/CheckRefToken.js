const RefreshToken = require("../../../models/RefreshTokenSchema")

async function CheckRefTokenexpired(refreshToken) {
	try {
		const resultTokens = await RefreshToken.find(
			{
				'refreshToken': refreshToken
			},
			{
				refreshToken: 1,
				expired: 1
			}
		).lean();
		const result = resultTokens.find(token => token.expired);
		if (result && result.expired) throw new Error('Refresh token has expired');
		return false;
	} catch (error) {
		console.error(`\x1b[31m[CheckRefTokenexpired]\x1b[0m`, error);
		return true;
	}
}

module.exports = {
	CheckRefTokenexpired
}