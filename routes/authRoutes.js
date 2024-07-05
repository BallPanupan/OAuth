const express = require('express');
const authController = require('../controllers/authController');
// const { AuthenticateToken } = require('../module/auth/AuthenticateToken');
const AuthenticateToken = require('../controllers/auth/module/AuthenticateToken.js');

const auth = require('../controllers/auth/index.js');

const router = express.Router();
router.get('/', auth.wellcome);
router.post('/register', auth.register);
router.post('/login', auth.login);

router.get('/me', AuthenticateToken, auth.profile);





// router.post('/newToken', authController.newToken);
// router.delete('/logout', authController.logout);


module.exports = router;
