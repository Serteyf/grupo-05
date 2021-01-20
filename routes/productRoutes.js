const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const isAdminMiddleware = require('../middlewares/isAdminMiddleware')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/../public/images/products");
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});
var upload = multer({ storage: storage });

const productController = require("../controllers/productController");

router.get("/", productController.all);
router.get("/create", isAdminMiddleware, productController.showCreate);

router.post("/create", upload.any(), productController.create);

router.get("/category/:category", productController.byCategory);

router.get("/edit/:id", isAdminMiddleware, productController.showEdit);

router.put("/edit/:id", upload.any(), productController.edit);

router.get("/delete/:id", isAdminMiddleware, productController.showDelete);

router.delete("/delete/:id", productController.delete);

router.get("/:id", productController.detail);

module.exports = router;
