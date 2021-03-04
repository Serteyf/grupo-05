const toThousand = require("../../utils/toThousand");
const db = require("../../database/models");

productsController = {
    list: (req, res) => {
        db.Product.findAll({
            raw: true,
        })
            .then((products) => {
                for (let i = 0; i < products.length; i++) {
                    products[i].setDataValue("endpoint", "/api/products/" + products[i].id)
                }

                let answer = {
                    meta: {
                        status: 200,                //Acá puede ir cualquier cosa//
                        total: products.length,
                        url: "/api/products"
                    },
                    data: products
                };

                res.json(answer);
            })
           
    },
    find: (req, res) => {
        db.Product.findByPk(req.params.id)
            .then((products) => {
                res.json(product);
            })
           
    },
    store: (req, res, next) => {
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

        res.json({
            status: 200
        });
}};

module.exports = productsController;