const express = require("express");
const router = express.Router();

const checkoutController = require("../controllers/checkoutController");

router.get("/", checkoutController.main);

module.exports = router;
