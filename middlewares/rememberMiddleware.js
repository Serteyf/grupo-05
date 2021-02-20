const db = require("../database/models");

function rememberMiddleware(req, res, next) {
    db.User.findAll({
        raw: true,
    })
        .then((users) => {
            if (req.cookies.remember) {
                const loggedUser = users.find((user) => {
                    return user.id == req.cookies.remember;
                });

                res.locals.user = loggedUser;
                next();
            } else {
                next();
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = rememberMiddleware;
