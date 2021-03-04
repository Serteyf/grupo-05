const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");

router.all("/", mainController.home);

router.get("/search", mainController.search);

router.get("/contact", mainController.contact);

module.exports = router;
