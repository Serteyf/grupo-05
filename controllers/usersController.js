usersController = {
    showRegister: (req, res) => {
        res.render("register")
    },
    showLogin: (req, res) => {
        res.render("login")
    }
};

module.exports = usersController;

