const express = require("express");
const router = express.Router();
const isLoggedMiddleware = require('../middlewares/isLoggedMiddleware')

const checkoutController = require("../controllers/checkoutController");

router.get("/", isLoggedMiddleware, checkoutController.main);

module.exports = router;
