const { _register } = require("./registerController");
const { _wellcome } = require("./wellcomeController");
const { _getProfile } = require("./getProfileController");
const { _login } = require("./login");


module.exports = {
	wellcome: _wellcome,
	register: _register,
	profile: _getProfile,
	login: _login,
}