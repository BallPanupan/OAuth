const jsonwebtoken = require("jsonwebtoken")
const { CheckUser } = require("./module/CheckUser");
const bcrypt = require("bcryptjs/dist/bcrypt");
const { generateAccessToken } = require("./module/generateAccessToken");
const { SaveRefreshToken } = require("./module/InsertLoginToken");

async function _login(req, res) {
	const username = req.body.username;
	const password = req.body.password;
	const user = await CheckUser(username);
	const match = await bcrypt.compare(password, user.data.password);
	if (user.status && match) {
		const userData = {
			"id": user.data._id,
			"username": user.data.username,
		}
		const refreshToken = jsonwebtoken.sign(userData, process.env.REFRESH_TOKEN_SECRET)
		const saveRefToken = await SaveRefreshToken({
			userId: user.data._id,
			refreshToken: refreshToken,
		})
		res.status(200).json({
			status: true,
			accessToken: generateAccessToken(userData),
			refreshToken: refreshToken
		})
	} else {
		res.sendStatus(401)
	}
}

module.exports = {
	_login,
};
