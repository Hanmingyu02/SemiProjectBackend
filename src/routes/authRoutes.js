const express = require('express');
const {login, refreshVerify, logout} = require('../controllers/authController')
const router = express.Router();


// /api/auth/login
router.post('/login', login);
router.post('/refresh', refreshVerify);
router.post('/logout', logout);

module.exports = router;