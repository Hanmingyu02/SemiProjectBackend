// src/routes/noticeRoutes.js
const express = require('express');
const router = express.Router();

router.get('/api/reservations', (req, res) => {
    res.send('Reservation Route');
});

module.exports = router;
