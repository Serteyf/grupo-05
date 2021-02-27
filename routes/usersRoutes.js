const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const { User } = require("../database/models");
const { check, body } = require("express-validator");

const isNotLoggedMiddleware = require("../middlewares/isNotLoggedMiddleware");
const isLoggedMiddleware = require("../middlewares/isLoggedMiddleware");

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

router.get("/register", isLoggedMiddleware, userController.showRegister);
router.post(
    "/register",
    upload.any(),
    [
        check("name")
            .isLength({
                min: 2,
            })
            .withMessage("El nombre debe tener al menos 2 caracteres."),
        check("user")
            .isLength({
                min: 2,
            })
            .withMessage("El usuario debe tener al menos 2 caracteres."),
        check("email")
            .isEmail()
            .withMessage("El email debe ser una dirección válida"),
        check("password")
            .isLength({
                min: 8,
            })
            .withMessage("La contraseña debe tener un mínimo de 8 caracteres"),
        check("avatar")
        .custom((value, {req}) => {
            if(req.files.mimetype === 'application/pdf'){
                return '.pdf'; // return "non-falsy" value to indicate valid data"
            }else{
                return false; // return "falsy" value to indicate invalid data
            }
        })
    .withMessage('Please only submit pdf documents.'), // custom error message that will be send back if the file in not a pdf.
            
        
        body("email")
            //  COMPLETAR CON VALIDACION PARA EMAIL
            .custom(async (value) => {
                const emailUser = await User.findOne({
                    where: { email: value },
                });
                if (!emailUser) {
                    return true;
                }
                return false;
            })
            .withMessage("Este email ya se encuentra registrado"),
    ],
    userController.register
);

router.get("/login", isLoggedMiddleware, userController.showLogin);
router.post("/login", userController.login);

router.get("/logout", isNotLoggedMiddleware, userController.logout);

module.exports = router;
