const { check, body } = require("express-validator");
const { User } = require("../../database/models");
const path = require("path");
// const validateFileExt = require("../../utils/validateFileExt");

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
                // validateFileExt(req, ".png", ".jpg", ".jpeg", ".gif");
                const validatedFile = req.files[0] == undefined ? "" : req.files[0].filename;
                let fileExtension = (path.extname(validatedFile)).toLowerCase();
                
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
        body('email').exists().trim().escape()
            .custom(async userEmail => {
                return new Promise(async (resolve, reject) => {
                    const emailExist = await User.findOne({ where: { email: userEmail } })

                    if(emailExist !== null){
                        reject(new Error('El mail ya existe'))
                    } else resolve(true);
                })
        }),
        body('user').exists().trim().escape()
            .custom(async userName => {
                return new Promise(async (resolve, reject) => {
                    const userExist = await User.findOne({ where: { user: userName } })

                    if(userExist !== null){
                        reject(new Error('El nombre de usuario ya está en uso'))
                    } else resolve(true);
                })
        }),
    ]
    ,
    login: [
        body('user').exists().trim().escape()
            .custom(async userName => {
                return new Promise(async (resolve, reject) => {
                    const userExist = await User.findOne({ where: { user: userName } })

                    if(!userExist){
                        reject(new Error('El nombre de usuario no existe'))
                    } else resolve(true);
                })
        }),
    ]
};

module.exports = validations;