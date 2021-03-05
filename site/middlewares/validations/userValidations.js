const { check, body } = require("express-validator");
const { User } = require("../../database/models");
const path = require("path");

const validations = {
    register: [
        check("name")
            .isLength({ min: 2, })
            .withMessage("El nombre debe tener al menos 2 caracteres."),
        check("user")
            .isLength({ min: 2, })
            .withMessage("El usuario debe tener al menos 2 caracteres."),
        check("email")
            .isEmail()
            .withMessage("El email debe ser una dirección válida"),
        check("password")
            .isLength({ min: 8, })
            .withMessage("La contraseña debe tener un mínimo de 8 caracteres"),
        body("avatar")
            .custom((value, {req}) => {
                let fileExtension = path.extname(req.files[0].filename);
                fileExtension.toLowerCase; // Not working
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
            .withMessage("La imagen puede ser en formato .png, .jpg, .jpeg o .gif"),
        body('email').exists().trim().escape().custom(userEmail=> {
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
    ]
    ,
    login: [
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
    ]
};

module.exports = validations;