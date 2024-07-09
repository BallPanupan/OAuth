const express = require('express');
const auth = require('../controllers/auth/index.js');
const AuthenticateToken = require('../controllers/auth/module/AuthenticateToken.js');
const router = express.Router();

router.get   ('/'              ,                    auth.wellcome      );
router.post  ('/register'      ,                    auth.register      );
router.post  ('/refreshToken'  ,                    auth.refreshToken  );
router.post  ('/login'         ,                    auth.login         );
router.delete('/logout'        ,                    auth.logout        );
router.get   ('/me'            , AuthenticateToken, auth.profile       );
router.get   ('/validateToken' , AuthenticateToken, auth.validateToken );

module.exports = router;