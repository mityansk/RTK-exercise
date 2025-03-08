const router = require('express').Router();
const AuthController = require('../controllers/Auth.controller.js');
const verifyRefreshToken = require('../middleware/verifyRefreshToken.js');

router.get('/refreshTokens', verifyRefreshToken, AuthController.refreshTokens);
router.post('/signUp', AuthController.signUp);
router.post('/signIn', AuthController.signIn);
router.get('/signOut', AuthController.signOut);

module.exports = router;
