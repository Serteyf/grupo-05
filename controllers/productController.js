const getProducts = require("../utils/getProducts");

productController = {
    all: (req, res) => {
        const products = getProducts();
        res.render("products-all", { products: products });
    },
    main: (req, res) => {
        res.render("product");
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
