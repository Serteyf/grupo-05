const getProducts = require("../utils/getProducts");
const toThousand = require("../utils/toThousand");

mainController = {
    home: (req, res) => {
        const products = getProducts();
        res.render("index", {
            products: products,
            thousand: toThousand,
        });
    }
};

module.exports = mainController;
