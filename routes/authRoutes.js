const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// router.get('/', authController.main);
router.post('/register', authController.register);
// router.get('/posts', authController.posts);
// router.get('/login', authController.login);
// router.get('/newToken', authController.newToken);
// router.get('/logout', authController.logout);


module.exports = router;
