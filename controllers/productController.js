const getProducts = require("../utils/getProducts");
const toThousand = require("../utils/toThousand");
const fs = require("fs");

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
    create: (req, res, next) => {
       const products = getProducts();
       const newProduct = {
            id: Number(products.length + 1),
            name: req.body.name,
            description: req.body.description,
            price: Number(req.body.price),
            discount: Number(req.body.discount),
            image: req.files[0].filename,
            category: req.body.category
       }
       products.push(newProduct);
       const productsJSON = JSON.stringify(products, null, 4);
       fs.writeFileSync( __dirname + "/../data/products.json",
        productsJSON);
        res.redirect("/products/" + newProduct.id);
    },
    edit: (req, res) => {
        res.send("Producto editado!");
    },
};

module.exports = productController;
