const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({ 
    destination: (req, file, cb) => {
            cb(null, __dirname + '/../public/images/products')
    },
    filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
  var upload = multer({ storage: storage });

const productController = require("../controllers/productController");

router.get("/", productController.all);
router.get("/create", productController.showCreate);

router.post("/create", upload.any(), productController.create);

router.get("/edit", productController.showEdit);

router.put("/edit", productController.edit);

router.get("/:id", productController.detail);

module.exports = router;
