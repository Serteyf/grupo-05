const express = require("express");
const router = express.Router();
const multer = require("multer");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/../public/images/users");
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});
var upload = multer({ storage: storage });

const userController = require("../controllers/usersController");

router.get("/register", userController.showRegister);
router.post("/register", upload.any(), userController.register);

router.get("/login", userController.showLogin);


module.exports = router;



