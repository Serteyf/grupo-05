const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");

router.all("/", mainController.home);

module.exports = router;
