const fs = require("fs");

function replaceAll(dato) {
    return dato.replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u');
};

module.exports = replaceAll;
