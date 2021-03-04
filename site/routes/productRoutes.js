const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const isAdminMiddleware = require('../middlewares/isAdminMiddleware')

const { Product } = require("../database/models");
const { check, body } = require("express-validator");

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

router.post("/create", upload.any(), [
    check("name")
    .isLength({
        min: 5,
    })
    .withMessage("El nombre del producto debe tener al menos 5 caracteres."),
    check("description")
    .isLength({
        min: 20,
    })
    .withMessage("La descripcion del producto debe tener al menos 20 caracteres."),
    check("price")
    .isFloat({min: 10})
    .withMessage("El precio dedebe ser mayor a $10."),
    body("photo")
    .custom((value, {req}) => {
        const fileExtension = path.extname(req.files[0].filename);
        console.log(fileExtension);
        switch (fileExtension) {
            case ".png":
            case ".jpg":
            case ".jpeg":
            case ".gif":
                return true;
            default:
                return false;
        }
    })
    .withMessage("La imagen tiene que ser en formato .png, .jpg, .jpeg o .gif"),
], productController.create);


router.get("/category/:category", productController.byCategory);

router.get("/edit/:id", isAdminMiddleware, productController.showEdit);

router.put("/edit/:id", upload.any(), productController.edit);

router.get("/delete/:id", isAdminMiddleware, productController.showDelete);

router.delete("/delete/:id", productController.delete);

router.get("/:id", productController.detail);

module.exports = router;
