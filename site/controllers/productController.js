const path = require("path");

productController = {
    main: (req, res) => {
        res.sendFile(path.resolve(__dirname, "../views/product.html"));
    },
};

module.exports = productController;
