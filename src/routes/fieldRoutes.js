const express = require("express");
const router = express.Router();
const { getFields, updateFieldStatus, checkAvailability } = require("../controllers/fieldController");

router.get("/", getFields);
router.get("/:field_id", checkAvailability);
router.post("/:field_id",updateFieldStatus);
module.exports = router;
