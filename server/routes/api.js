// routes/api.js
const express = require("express");
const { handleVerifyMessage } = require("../controllers/verifyController");
const { handleStoreKey } = require("../controllers/keyController");

const router = express.Router();

router.post("/store-key", handleStoreKey);
router.post("/verify", handleVerifyMessage);

module.exports = router;
