const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.get("/", productController.main);
router.get("/all", productController.all);
router.get("/create", productController.showCreate);
router.get("/edit", productController.showEdit);

router.post("/create", productController.create);

router.put("/edit", productController.edit);

module.exports = router;
