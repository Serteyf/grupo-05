productController = {
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
