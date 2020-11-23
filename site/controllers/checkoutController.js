const path = require("path");

checkoutController = {
    main: (req, res) => {
        res.sendFile(path.resolve(__dirname, "../views/checkout.html"));
    },
};

module.exports = checkoutController;
