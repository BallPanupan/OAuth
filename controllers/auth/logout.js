const RefreshToken = require("../../models/RefreshTokenSchema");
async function _logout(req, res) {
	try {
		const authHeader = req.headers['authorization']
		const token = authHeader && authHeader.split(' ')[1]
		if (!token) throw new Error('refreshToken is null');
		const result = await RefreshToken.updateMany({ refreshToken: token }, {
			$set: {
				"expired": true,
			}
		}).lean();
		return res.json({
			statue: true
		})
	} catch (error) {
		const customError = {
			message: error.message,
			status: false,
		}
		console.error(`\x1b[31m[logout]\x1b[0m`, customError);
		return res.status(401).json(customError);
	}
}

module.exports = {
	_logout,
};
