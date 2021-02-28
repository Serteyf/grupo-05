const toThousand = require("../utils/toThousand");
const productServices = require("../services/productServices");
const db = require("../database/models");

productController = {
    all: async(req, res) => {
        try {
            const products = await productServices.findAll();
            res.render("products-all", {
                products: products,
                thousand: toThousand
            })
        } catch (err) {
            console.log(err)
        }
    },
    byCategory: async(req, res) => {
        try {
            const productsByCategory = await productServices.findByCategory(req, res);
            if (productsByCategory == "") {
                    return res.render("not-found");
                }
            res.render("products-all", {
                products: productsByCategory,
                thousand: toThousand,
            })
        } catch(err) {
            console.log(err);
        }
    },
    detail: async(req, res) => {
        try {
            const selectedProduct = await productServices.findOne(req.params.id);
            const suggestedProducts = await productServices.findSuggested(selectedProduct.categoryId)
            suggestedProducts.splice(suggestedProducts.indexOf(selectedProduct));

            res.render("product", {
                product: selectedProduct,
                suggestedProducts: suggestedProducts,
                thousand: toThousand,
            });
        } catch(err) {
            console.log(err);
        }
    },
    showCreate: (req, res) => {
        res.render("product-create");
    },
    showEdit: async(req, res) => {
        const product = await productServices.findOne(req.params.id);
        if(product == null){
            return res.render('not-found.ejs')
        };
        res.render("product_edit", {
            product: product,
            toThousand: toThousand,
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
    showDelete: async(req, res) => {
        try {
            const product = await productServices.findOne(req.params.id);

            if (product == null) {
                return res.send("Error 404 - Producto no encontrado");
            }
            res.render("product-delete", {
                product: product,
            });
            res.render("product", {
                    product: product,
                    suggestedProducts: suggestedProducts,
                    thousand: toThousand,
                })
        } catch(err) {
            console.log(err);
        }
        // db.Product.findAll({
        //     raw: true,
        // })
        //     .then((products) => {
        //         const selectedProduct = products.find((product) => {
        //             return product.id == req.params.id;
        //         });
        //         if (selectedProduct == null) {
        //             return res.send("Error 404 - Producto no encontrado");
        //         }
        //         res.render("product-delete", {
        //             product: selectedProduct,
        //         });

        //         res.render("product", {
        //             product: selectedProduct,
        //             suggestedProducts: suggestedProducts,
        //             thousand: toThousand,
        //         });
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
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
