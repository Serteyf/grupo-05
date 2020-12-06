productController = {
    main: (req, res) => {
        res.render("product");
    },
    create: (req, res) => {
        res.render("product-create");
    },
    edit: (req, res) => {
        res.render("product-edit");
    },
};

module.exports = productController;
