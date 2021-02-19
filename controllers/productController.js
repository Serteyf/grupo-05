const getProducts = require("../utils/getProducts");
const toThousand = require("../utils/toThousand");
const fs = require("fs");
const db = require("../database/models");

productController = {
    all: (req, res) => {
        db.Product.findAll({
            raw: true,
        })
            .then((products) => {
                console.log(products);
                res.render("products-all", {
                    products: products,
                    thousand: toThousand,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    },
    byCategory: (req, res) => {
        db.Product.findAll({
            raw: true,
            where: {
                categoryId: req.params.category,
            },
        })
            .then((products) => {
                if (products == "") {
                    return res.render("not-found");
                }
                res.render("products-all", {
                    products: products,
                    thousand: toThousand,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    },
    detail: (req, res) => {
        db.Product.findAll({
            raw: true,
        })
            .then((products) => {
                const selectedProduct = products.find((product) => {
                    return req.params.id == product.id;
                });
                const suggestedProducts = products.filter(
                    (product) => product.category == selectedProduct.category
                );
                suggestedProducts.splice(
                    suggestedProducts.indexOf(selectedProduct),
                    1
                );
                res.render("product", {
                    product: selectedProduct,
                    suggestedProducts: suggestedProducts,
                    thousand: toThousand,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    },
    showCreate: (req, res) => {
        res.render("product-create");
    },
    showEdit: (req, res) => {
        db.Product.findAll({
            raw: true,
        })
            .then((products) => {
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
            })
            .catch((error) => {
                console.log(error);
            });
    },
    create: (req, res, next) => {
        db.Product.create({
            id: null,
            name: req.body.name,
            description: req.body.description,
            price: Number(req.body.price),
            discount: Number(req.body.discount),
            featured: Number(req.body.featured),
            image: req.files[0].filename,
            categoryId: req.body.category,
        });

        res.redirect("/products/");
    },
    edit: (req, res) => {
        db.Product.update(
            {
                name: req.body.name,
                description: req.body.description,
                price: Number(req.body.price),
                discount: Number(req.body.discount),
                image:
                    req.files[0] == undefined
                        ? db.Product.image
                        : req.files[0].filename,
                category: req.body.category,
                featured: req.body.featured,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );

        res.redirect("/products/" + req.params.id);
    },
    showDelete: (req, res) => {
        db.Product.findAll({
            raw: true,
        })
            .then((products) => {
                const selectedProduct = products.find((product) => {
                    return product.id == req.params.id;
                });
                if (selectedProduct == null) {
                    return res.send("Error 404 - Producto no encontrado");
                }
                res.render("product-delete", {
                    product: selectedProduct,
                });

                res.render("product", {
                    product: selectedProduct,
                    suggestedProducts: suggestedProducts,
                    thousand: toThousand,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    },

    delete: (req, res) => {
        db.Product.destroy({
            where: {
                id: req.params.id,
            },
        });

        res.redirect("/products");
    },
};

module.exports = productController;
