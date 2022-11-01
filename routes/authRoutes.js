const express = require('express');
const authController = require('../controllers/authController');
const { AuthenticateToken } = require('../module/AuthenticateToken');

const router = express.Router();

router.get('/', authController.main);
router.post('/register', authController.register);
router.get('/posts', AuthenticateToken, authController.posts);
router.post('/login', authController.login);
router.post('/newToken', authController.newToken);
router.delete('/logout', authController.logout);


module.exports = router;
