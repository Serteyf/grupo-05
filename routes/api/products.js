const express = require("express");
const router = express.Router();
const productsAPIController = require("../../controllers/api/productsController")

router.get("/", productsAPIController.list);

router.get("/:id", productsAPIController.find);

router.post("/", productsAPIController.store);

module.exports = router;