const getUsers = require("../utils/getUsers");
const saveUsers = require("../utils/saveUsers");
const bcrypt = require("bcrypt");

usersController = {
    showRegister: (req, res) => {
        res.render("register")
    },
    register: (req, res) => {
        const users = getUsers();

        const lastUserIndex = users.length - 1;
        const lastUser = users[lastUserIndex];
        const newId = lastUser ? lastUser.id + 1 : 1;

        if (req.body.password2) {
            delete req.body.password2;
        }

        const newUser = {
            id: newId,
            ...req.body,
            avatar: req.files[0].filename,
            pass: bcrypt.hashSync(req.body.password, 12),
        };

        users.push(newUser);
        saveUsers(users);

        res.redirect("/");
    },
    showLogin: (req, res) => {
        res.render("login")
    },
    login: (req, res) => {
        const usersDb = getUsers();
        const user = usersDb.find((user) => {
            return (
                user.user == req.body.user &&
                bcrypt.compareSync(req.body.password, user.pass)
            );
        });
        res.redirect("/")
    },
};

module.exports = usersController;

