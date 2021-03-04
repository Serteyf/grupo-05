const bcrypt = require("bcrypt");
const db = require("../database/models");
const path = require("path"); 
const {
    validationResult
} = require("express-validator");

usersController = {
    showRegister: (req, res) => {
        res.render("register");
    },
    register: (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors)
            res.render(path.resolve(__dirname, '../views/users/register.ejs'), {
                errors: errors.errors
            })

        } else {
            
            if (req.body.password2 != req.body.password) {
                res.redirect("/users/register");
            } else {
                db.User.create({
                    id: null,
                    ...req.body,
                    categoryId: 1,
                    avatar: req.files[0] == undefined ? null : req.files[0].filename,
                    password: bcrypt.hashSync(req.body.password, 12),
                });
                delete req.body.password2;
                
                res.redirect("/");
            }
        }
    },
    showLogin: (req, res) => {
        res.render("login");
    },
    login: (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors)
            res.render(path.resolve(__dirname, '../views/users/login.ejs'), {
                errors: errors.errors
            })
        } else {
            db.User.findAll({
                raw: true,
            })
                .then((users) => {
                    const user = users.find((user) => {
                        return (
                            user.user == req.body.user &&
                            bcrypt.compareSync(req.body.password, user.password)
                        );
                    });
    
                    if (!user) {
                        return res.redirect("/users/register");
                    } else if (req.body.remember) {
                        req.session.loggedUserId = user.id;
                        res.cookie("remember", req.session.loggedUserId, {
                            maxAge: 1800000,
                        });
                        return res.redirect("/");
                    } else {
                        req.session.loggedUserId = user.id;
                        return res.redirect("/");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie("remember");
        res.redirect("/");
    },
};

module.exports = usersController;
