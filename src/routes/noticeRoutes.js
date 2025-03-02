// src/routes/noticeRoutes.js
const express = require('express');
const router = express.Router();

router.get('/api/notices', (req, res) => {
    res.send('Notice Route');
});

module.exports = router;
