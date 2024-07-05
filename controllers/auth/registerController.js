const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const { SaveRefreshToken } = require('./module/InsertLoginToken');
const GenerateAccessToken = require('./module/GenerateAccessToken');

async function _register(req, res) {
	const { username, password, firstName, lastName, email } = req.body;

	try {
		// Check if user already exists
		let existingUser = await User.findOne({ email });

		if (existingUser) {
			return res.status(400).json({ status: false, message: 'User already exists' });
		}

		// Prepare user data
		const prepareData = {
			username,
			password: password,
			accessToken: GenerateAccessToken({ 'username': username }),
			refreshToken: jwt.sign({ 'username': username }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'}),
			firstName,
			lastName,
			email,
			createdAt: Date.now(),
			updatedAt: null, // You can set this to null or handle it as needed
			application: []
		};

		// Create new user
		const newUser = await User.create(prepareData);
		if(!newUser) throw new Error('User already exists')
		const ref = {
			userId: newUser._id,
			refreshToken: prepareData.refreshToken,
			createdAt: prepareData.createdAt,
			expired: false,
		}

		// Save RefreshToken
		const saveRefToken = await SaveRefreshToken({
			userId: newUser._id,
			refreshToken: prepareData.refreshToken,
		})
		if (!saveRefToken) throw {
			message: saveRefToken,
		};

		return res.status(201).json({
			accessToken: prepareData.accessToken,
			refreshToken: prepareData.refreshToken,
			status: true,
		});
	} catch (error) {
		console.error(`\x1b[31m[register]\x1b[0m`, error);
		return res.status(500).json({ status: false, message: error.message || 'Internal Server Error' });
	}
}

module.exports = {
	_register,
};
