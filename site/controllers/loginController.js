const path = require("path");

loginController = {
    main: (req, res) => {
        res.sendFile(path.resolve(__dirname, "../views/login.html"));
    },
};

module.exports = loginController;
