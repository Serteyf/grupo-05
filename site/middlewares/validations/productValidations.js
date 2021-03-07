const { check, body } = require("express-validator");
const path = require("path");
// const validateFileExt = require("../../utils/validateFileExt");

const validations = {
    create: [
        check("name")
            .isLength({min: 5})
            .withMessage("El nombre del producto debe tener al menos 5 caracteres."),
        check("description")
            .isLength({min: 20})
            .withMessage("La descripcion del producto debe tener al menos 20 caracteres."),
        check("price")
            .isFloat({min: 10})
            .withMessage("El precio dedebe ser mayor a $10."),
        body("photo")
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
            .withMessage("La imagen tiene que ser en formato .png, .jpg, .jpeg o .gif"),
    ]
};

module.exports = validations;