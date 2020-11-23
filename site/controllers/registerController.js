const path = require("path");

registerController = {
    main: (req, res) => {
        res.sendFile(path.resolve(__dirname, "../views/register.html"));
    },
};

module.exports = registerController;
