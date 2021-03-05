const bcrypt = require("bcrypt");
const path = require("path"); 

const { User } = require("../database/models");
const { validationResult } = require("express-validator");

usersController = {
    showRegister: (req, res) => {
        res.render("register");
    },
    register: async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors)
            return res.render(path.resolve(__dirname, '../views/users/register.ejs'), {
                errors: errors.errors
            })
        }
        if (req.body.password2 != req.body.password) {
            return res.redirect("/users/register");
        }
        await User.create({
            id: null,
            ...req.body,
            categoryId: 1,
            avatar: req.files[0] == undefined ? null : req.files[0].filename,
            password: bcrypt.hashSync(req.body.password, 12),
        });

        delete req.body.password2;
        
        res.redirect("/");
    },
    showLogin: (req, res) => {
        res.render("login");
    },
    login: async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors)
            res.render(path.resolve(__dirname, '../views/users/login.ejs'), {
                errors: errors.errors
            })
        } else {
            const user = await User.findOne({
                where: { user: req.body.user }
            });
            const pwCompare = bcrypt.compareSync(req.body.password, user.password);

            if(!user || !pwCompare) return res.redirect("/users/register");

            if(req.body.remember) {
                req.session.loggedUserId = user.id;
                res.cookie("remember", req.session.loggedUserId, { maxAge: 1800000 })
            } 

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
