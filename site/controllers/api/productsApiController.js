const toThousand = require("../../utils/toThousand");
const db = require("../../database/models");

productsController = {
    list: async (req, res) => {
        const products = await db.Product.findAll({
            include: [{ association: "product_category" }],
        });

        const categoryProducts = async (catId) => {
            const products = await db.Product.findAll({
                where: {
                    categoryId: catId,
                },
            });
            return products;
        };

        const count = await db.Product.count();
        const consoleCount = await categoryProducts(1);
        const gamesCount = await categoryProducts(2);
        const accesoriesCount = await categoryProducts(3);
        const retroCount = await categoryProducts(4);

        const countByCategory = {
            consoles: consoleCount.length,
            games: gamesCount.length,
            accesories: accesoriesCount.length,
            retro: retroCount.length,
        };

        products.forEach((product) =>
            product.setDataValue("detail", "api/products/" + product.id)
        );

        res.json({
            meta: {
                status: 200,
                count,
                countByCategory,
                url: "/api/products",
            },
            data: products,
        });
    },
    find: async (req, res) => {
        const products = await db.Product.findByPk(req.params.id, {
            include: [{ association: "product_category" }],
        });

        if (products !== null) {
            products.setDataValue(
                "product-image",
                "images/products/" + products.image
            );
        }

        res.json(products);
    },

    count: async (req, res) => {
        const count = await db.Product.count();

        res.json({
            meta: {
                count,
            },
            count,
        });
    },

    totalPrice: async (req, res) => {
        const products = await db.Product.findAll({});
        let totalPrice = 0;

        for (let i = 0; i < products.length; i++) {
            totalPrice += products[i].price;
        }

        res.json({
            meta: {
                totalPrice,
            },
            totalPrice,
        });
    },

    // store: (req, res, next) => {
    //     db.Product.create({
    //         id: null,
    //         name: req.body.name,
    //         description: req.body.description,
    //         price: Number(req.body.price),
    //         discount: Number(req.body.discount),
    //         featured: Number(req.body.featured),
    //         image: req.files[0].filename,
    //         categoryId: req.body.category,
    //     });

    // res.json({
    //     status: 200
    // });
};

module.exports = productsController;
