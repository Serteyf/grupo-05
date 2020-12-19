const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.get("/", productController.all);
router.get("/create", productController.showCreate);
router.get("/edit", productController.showEdit);
router.get("/:id", productController.detail);

router.post("/create", productController.create);

router.put("/edit", productController.edit);

module.exports = router;
