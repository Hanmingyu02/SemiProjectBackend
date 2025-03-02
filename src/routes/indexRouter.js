// src/routes/indexRouter.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Index Route');
});

module.exports = router;