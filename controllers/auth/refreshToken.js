async function _refreshToken(req, res) {
	try {
		const refreshToken = req.body.token;
		if(refreshToken == null ) throw new Error('Token is expired');

		let userToken = await CheckRefToken({refreshToken:refreshToken})


	}catch(error){
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