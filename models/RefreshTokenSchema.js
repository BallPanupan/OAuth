const mongoose = require('mongoose');

const RefreshTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  refreshToken: { type: String, required: true },
  createdAt: { type: String, default: Date.now },
	expired:  { type: Boolean, default: false },
  // Optional expiry time for the refresh token
  // expiryAt: { type: Date, expires: 0 }
});

const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema);

module.exports = RefreshToken;
