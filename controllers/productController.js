const getProducts = require("../utils/getProducts");
const toThousand = require("../utils/toThousand");
const fs = require("fs");
const db = require("../database/models");

productController = {
    all: (req, res) => {
        const products = getProducts();

        db.sequelize.query("SELECT * FROM products")
            .then((productos) => {
                console.log(productos);
            })
            .catch((error) => {
                console.log(error);
            });

        res.render("products-all", {
            products: products,
            thousand: toThousand,
        });
    },
    byCategory: (req, res) => {
        const products = getProducts();
        const categoryResults = products.filter(
            (product) => product.category == req.params.category
        );

        if (categoryResults == "") {
            return res.render("not-found");
        }

        res.render("products-all", {
            products: categoryResults,
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
        const products = getProducts();
        const selectedProduct = products.find((product) => {
            return product.id == req.params.id;
        });
        if (selectedProduct == null) {
            return res.send("Error 404 - Producto no encontrado");
        }

        res.render("product_edit", {
            product: selectedProduct,
            toThousand: toThousand,
        });
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
            category: req.body.category,
        };

        products.push(newProduct);

        const productsJSON = JSON.stringify(products, null, 4);

        fs.writeFileSync(__dirname + "/../data/products.json", productsJSON);

        res.redirect("/products/" + newProduct.id);
    },
    edit: (req, res) => {
        const products = getProducts();
        const selectedProduct = products.find((product) => {
            return product.id == req.params.id;
        });

        const editedProduct = {
            id: selectedProduct.id,
            name: req.body.name,
            description: req.body.description,
            price: Number(req.body.price),
            discount: Number(req.body.discount),
            image:
                req.files[0] == undefined
                    ? selectedProduct.image
                    : req.files[0].filename,
            category: req.body.category,
            outstanding: req.body.outstanding,
        };

        products.splice(products.indexOf(selectedProduct), 1, editedProduct);

        const productsJSON = JSON.stringify(products, null, 4);

        fs.writeFileSync(__dirname + "/../data/products.json", productsJSON);

        res.redirect("/products/" + editedProduct.id);
    },
    showDelete: (req, res) => {
        const products = getProducts();
        const selectedProduct = products.find((product) => {
            return product.id == req.params.id;
        });
        if (selectedProduct == null) {
            return res.send("Error 404 - Producto no encontrado");
        }
        res.render("product-delete", {
            product: selectedProduct,
        });
    },
    delete: (req, res) => {
        const products = getProducts();
        const selectedProduct = products.find((product) => {
            return product.id == req.params.id;
        });

        products.splice(products.indexOf(selectedProduct), 1);

        const productsJSON = JSON.stringify(products, null, 4);

        fs.writeFileSync(__dirname + "/../data/products.json", productsJSON);

        res.redirect("/products");
    },
};

module.exports = productController;
