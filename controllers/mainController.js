const getProducts = require("../utils/getProducts");
const toThousand = require("../utils/toThousand");

mainController = {
    home: (req, res) => {
        const products = getProducts();
        res.render("index", {
            products: products,
            thousand: toThousand,
        });
    },
    search: (req, res) => {
        const products = getProducts();
        let keyword = req.query.buscar;
        let results = [];

        for (let i = 0; i < products.length; i++) {
            if (
                products[i].name.toLowerCase().includes(keyword.toLowerCase())
            ) {
                results.push(products[i]);
            }
        }

        res.render("product-search", {
            results: results,
            keyword: keyword,
            thousand: toThousand
        });
    }
};

module.exports = mainController;
