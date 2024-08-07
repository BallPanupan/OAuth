const { _register     } = require("./registerController"   );
const { _wellcome     } = require("./wellcomeController"   );
const { _getProfile   } = require("./getProfileController" );
const { _login        } = require("./login"                );
const { _refreshToken } = require("./refreshToken"         );
const { _logout       } = require("./logout"               );
const { _validateToken } = require("./validateToken");

module.exports = {
	wellcome     : _wellcome     ,
	register     : _register     ,
	profile      : _getProfile   ,
	login        : _login        ,
	refreshToken : _refreshToken ,
	logout       : _logout       ,
	validateToken: _validateToken,
}