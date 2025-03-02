// src/routes/fieldRoutes.js
const express = require('express');
const router = express.Router();

router.get('/api/fields', (req, res) => {
    res.send('Field Route');
});

module.exports = router;
