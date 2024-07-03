const User = require('../../models/User');
const { generateAccessToken } = require('../../module/auth/generateAccessToken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const RefreshToken = require('../../models/RefreshTokenSchema');

async function _register(req, res) {
	const { username, password, firstName, lastName, email } = req.body;

	try {
		// Check if user already exists
		let existingUser = await User.findOne({ email });

		if (existingUser) {
			return res.status(400).json({ status: 'error', message: 'User already exists' });
		}

		// Encrypt the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Prepare user data
		const prepareData = {
			username,
			password: hashedPassword,
			accessToken: generateAccessToken({ name: username }),
			refreshToken: jwt.sign({ name: username }, process.env.REFRESH_TOKEN_SECRET),
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
		const saveRef = await RefreshToken.create(ref);
		return res.status(201).json({
			accessToken: prepareData.accessToken,
			refreshToken: prepareData.refreshToken,
			status: true,
		});
	} catch (error) {
		console.error('Error registering user:', error);
		return res.status(500).json({ status: 'error', message: error.message || 'Internal Server Error' });
	}
}

module.exports = {
	_register,
};
