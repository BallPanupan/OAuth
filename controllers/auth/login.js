const jsonwebtoken = require("jsonwebtoken")
const { CheckUser } = require("./module/CheckUser");
const bcrypt = require("bcryptjs/dist/bcrypt");
const saveToken = require("./module/saveToken");
const GenerateAccessToken = require("./module/GenerateAccessToken");

async function _login(req, res) {
	try {
		const username = req.body.username;
		const password = req.body.password;
		const user = await CheckUser(username);
		const match = await bcrypt.compare(password, user.data.password);

		if (user.status && match) {
			const userData = {
				"id"      : user.data._id     ,
				"username": user.data.username,
			}
			const refreshToken = jsonwebtoken.sign(userData, process.env.REFRESH_TOKEN_SECRET,{expiresIn: '1d'} )
			const saveRefToken = await saveToken.refreshToken({
				userId: user.data._id,
				refreshToken: refreshToken,
			})
			if (!saveRefToken) throw {
				message: saveRefToken,
				user: user.data.username,
			};
			const accessToken = await GenerateAccessToken(userData);
			const saveAccessToken = await saveToken.accessToken({
				userId: user.data._id,
				accessToken: accessToken,
			})
			if (!saveAccessToken) throw {
				message: saveRefToken,
				user   : user.data.username,
			};
			res.status(200).json({
				status      : true,
				accessToken : accessToken,
				refreshToken: refreshToken
			})
		}
	} catch (error) {
		// error with red color
		console.error(`\x1b[31m[login]\x1b[0m`, {
			message: error.message,
			user: error.user,
		});
		return res.status(401).json({
			status: false
		})
	}


}

module.exports = {
	_login,
};
