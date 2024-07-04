const { _register } = require("./registerController");
const { _wellcome } = require("./wellcomeController");
const { _getProfile } = require("./getProfileController");


module.exports = {
	wellcome: _wellcome,
	register: _register,
	profile: _getProfile,
}