const express = require('express');
const router = express.Router();
const {
    getFields,
    getFieldById,
    updateField,
    updateFieldStatus,
    checkAvailability,
} = require('../controllers/fieldController');

router.get('/', getFields);
module.exports = router;
