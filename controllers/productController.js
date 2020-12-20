const getProducts = require("../utils/getProducts");
const toThousand = require("../utils/toThousand");

productController = {
    all: (req, res) => {
        const products = getProducts();
        res.render("products-all", {
            products: products,
            thousand: toThousand,
        });
    },
    detail: (req, res) => {
        const products = getProducts();
        const selectedProduct = products.find((product) => {
            return req.params.id == product.id;
        });

        const suggestedProducts = products.filter(
            (product) => product.category == selectedProduct.category
        );

        suggestedProducts.splice(suggestedProducts.indexOf(selectedProduct), 1);

        res.render("product", {
            product: selectedProduct,
            suggestedProducts: suggestedProducts,
            thousand: toThousand,
        });
    },
    showCreate: (req, res) => {
        res.render("product-create");
    },
    showEdit: (req, res) => {
        res.render("product-edit");
    },
    create: (req, res) => {
        res.send("Producto creado!");
    },
    edit: (req, res) => {
        res.send("Producto editado!");
    },
};

module.exports = productController;
