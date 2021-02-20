const getProducts = require("../utils/getProducts");
const toThousand = require("../utils/toThousand");
const replaceAll = require("../utils/replaceAll");
const db = require("../database/models");

mainController = {
    home: (req, res) => {
        db.Product.findAll({
            raw: true,
        })
            .then((products) => {
                res.render("index", {
                    products: products,
                    thousand: toThousand,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    },
    search: (req, res) => {
        const products = getProducts();
        let keyword = req.query.buscar.toLowerCase();
        let keywordReplace = replaceAll(keyword);
        let results = [];

        for (let i = 0; i < products.length; i++) {
            const product = products[i].name.toLowerCase();
            const productReplace = replaceAll(product);
            if (productReplace.includes(keywordReplace)) {
                results.push(products[i]);
            }
        }

        res.render("product-search", {
            results: results,
            keyword: keyword,
            thousand: toThousand,
        });
    },
    contact: (req, res) => {
        res.render("contact");
    },
};

module.exports = mainController;
