const path = require("path");
const toThousand = require("../utils/toThousand");
const productServices = require("../services/productServices");
const { Product } = require("../database/models");

const { validationResult } = require("express-validator");

productController = {
    all: async (req, res) => {
        const products = await productServices.findAll();
        res.render("products-all", {
            products: products,
            thousand: toThousand,
        });
    },
    byCategory: async (req, res) => {
        const productsByCategory = await productServices.findByCategory(req);
        if (productsByCategory == "") {
            return res.render("not-found");
        }
        res.render("products-all", {
            products: productsByCategory,
            thousand: toThousand,
        });
    },
    detail: async (req, res) => {
        const selectedProduct = await productServices.findOne(req.params.id);
        const suggestedProducts = await productServices.findSuggested(
            selectedProduct.categoryId
        );
        suggestedProducts.splice(suggestedProducts.indexOf(selectedProduct));

        res.render("product", {
            product: selectedProduct,
            suggestedProducts: suggestedProducts,
            thousand: toThousand,
        });
    },
    showCreate: async (req, res) => {
        await res.render("product-create");
    },
    showEdit: async (req, res) => {
        const product = await productServices.findOne(req.params.id);
        if (product == null) {
            return res.render("not-found.ejs");
        }
        res.render("product_edit", {
            product: product,
            toThousand: toThousand,
        });
    },
    create: (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors);
            return res.render(
                path.resolve(__dirname, "../views/products/product-create.ejs"),
                {
                    errors: errors.errors,
                }
            );
        }
        Product.create({
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
        Product.update(
            {
                name: req.body.name,
                description: req.body.description,
                price: Number(req.body.price),
                discount: Number(req.body.discount),
                image:
                    req.files[0] == undefined
                        ? Product.image
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
    showDelete: async (req, res) => {
        const product = await productServices.findOne(req.params.id);

        if (product == null) {
            return res.send("Error 404 - Producto no encontrado");
        }
        res.render("product-delete", {
            product: product,
        });
    },

    delete: (req, res) => {
        Product.destroy({
            where: { id: req.params.id },
        });

        res.redirect("/products");
    },
};

module.exports = productController;
