const path = require("path");

function validateFileExt(req, ...params){
    const fileExtension = path.extname(req.files[0].filename);
    for (param of params){
        switch(fileExtension) {
            case param:
                return true;
            default:
                return false;
        }
    }
};

module.exports = validateFileExt;