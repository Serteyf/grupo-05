const express = require("express");
const router = express.Router();

const isAdminMiddleware = require('../middlewares/auth/isAdminMiddleware');
const validations = require("../middlewares/validations/productValidations");
const upload = require("../middlewares/multer");

const productController = require("../controllers/productController");

router.get("/", productController.all);

router.get("/create", isAdminMiddleware, productController.showCreate);
router.post("/create", upload.any(), validations.create, productController.create);

router.get("/category/:category", productController.byCategory);

router.get("/edit/:id", isAdminMiddleware, productController.showEdit);
router.put("/edit/:id", upload.any(), productController.edit);

router.get("/delete/:id", isAdminMiddleware, productController.showDelete);
router.delete("/delete/:id", productController.delete);

router.get("/:id", productController.detail);

module.exports = router;
