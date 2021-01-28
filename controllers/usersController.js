const getUsers = require("../utils/getUsers");
const saveUsers = require("../utils/saveUsers");
const bcrypt = require("bcrypt");

usersController = {
    showRegister: (req, res) => {
        res.render("register");
    },
    register: (req, res, next) => {
        const users = getUsers();

        const lastUserIndex = users.length - 1;
        const lastUser = users[lastUserIndex];
        const newId = lastUser ? lastUser.id + 1 : 1;

        if (req.body.password2 != req.body.password) {
            res.redirect("/users/register");
        } else {
            delete req.body.password2;

            const newUser = {
                id: newId,
                ...req.body,
                avatar: req.files[0].filename,
                password: bcrypt.hashSync(req.body.password, 12),
            };

            users.push(newUser);
            saveUsers(users);

            res.redirect("/");
        }
    },
    showLogin: (req, res) => {
        res.render("login");
    },
    login: (req, res) => {
        const users = getUsers();
        const user = users.find((user) => {
            return (
                user.user == req.body.user &&
                bcrypt.compareSync(req.body.password, user.password)
            );
        });

        if (!user) {
            return res.redirect("/users/login");
        } else if (req.body.remember) {
            req.session.loggedUserId = user.id;
            res.cookie("remember", req.session.loggedUserId, { maxAge: 1800000 });
            return res.redirect("/");
        } else {
            req.session.loggedUserId = user.id;
            return res.redirect("/");
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie("remember");
        res.redirect("/");
    },
};

module.exports = usersController;
