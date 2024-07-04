const User = require("../../models/User")

async function _getProfile(req, res) {
	let user = await User.findOne({ username: req.user.username }).lean() || null
	if (user) {
		res.json(user)
	} else {
		res.sendStatus(401)
	}
}

module.exports = {
	_getProfile
}