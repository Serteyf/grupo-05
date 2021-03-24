const express = require("express");
const router = express.Router();
const productsApiController = require("../../controllers/api/productsApiController");

router.get("/", productsApiController.list);
router.get("/count", productsApiController.count);
router.get("/total-price", productsApiController.totalPrice);
router.get("/:id", productsApiController.find);

module.exports = router;
