const express = require("express");
const router = express.Router();
const isNotLoggedMiddleware = require('../middlewares/auth/isNotLoggedMiddleware')

const checkoutController = require("../controllers/checkoutController");

router.get("/", isNotLoggedMiddleware, checkoutController.main);

module.exports = router;
