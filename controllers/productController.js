const getProducts = require("../utils/getProducts");

productController = {
    all: (req, res) => {
        const products = getProducts();
        res.render("products-all", { products: products });
    },
    detail: (req, res) => {
        const products = getProducts();
        const selectedProduct = products.find((product) => {
            return req.params.id == product.id;
        });
        res.render("product", { product: selectedProduct });
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
