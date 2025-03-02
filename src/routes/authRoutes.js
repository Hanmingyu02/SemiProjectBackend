// src/routes/noticeRoutes.js
const express = require('express');
const router = express.Router();

router.get('/api/auth', (req, res) => {
    res.send('Auth Route');
});

module.exports = router;
