// src/routes/noticeRoutes.js
const express = require('express');
const router = express.Router();

router.get('/api/users', (req, res) => {
    res.send('User Route');
});

module.exports = router;
