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
        
        body("avatar")
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
            .withMessage("La imagen puede ser en formato .png, .jpg, .jpeg o .gif"), // custom error message that will be send back if the file in not a pdf.
        
        body('email', 'Invalid email').exists().trim().escape().custom(userEmail=> {
            return new Promise((resolve, reject) => {
                User.findOne({ where: { email: userEmail } })
                .then(emailExist => {
                    if(emailExist !== null){
                        reject(new Error('El mail ya existe'))
                    }else{
                        resolve(true)
                    }
                })
                
            })
        }),
        body('user').exists().trim().escape().custom(userName=> {
            return new Promise((resolve, reject) => {
                User.findOne({ where: { user: userName } })
                .then(userExist => {
                    if(userExist !== null){
                        reject(new Error('El usuario ya existe'))
                    }else{
                        resolve(true)
                    }
                })
                
            })
        })
    ],
    userController.register
);

router.get("/login", isLoggedMiddleware, userController.showLogin);
router.post("/login", [
    body('user').exists().trim().escape().custom(userName=> {
        return new Promise((resolve, reject) => {
            User.findOne({ where: { user: userName } })
            .then(userExist => {
                if(!userExist){
                    reject(new Error('El usuario no existe'))
                }else{
                    resolve(true)
                }
            })
            
        })
    })
],
userController.login);

router.get("/logout", isNotLoggedMiddleware, userController.logout);

module.exports = router;
