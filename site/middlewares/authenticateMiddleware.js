const db = require("../database/models");

// Guarda la info del usuario logueado en locals.user

function authenticateMiddleware(req, res, next) {
    db.User.findAll({
        raw: true,
    })
        .then((users) => {
            const id = req.session.loggedUserId;

            if (!id) return next();

            const loggedUser = users.find((user) => {
                return user.id == id;
            });

            if (!loggedUser) {
                delete req.session.loggedUserId;
                return next();
            }

            res.locals.user = loggedUser;

            next();
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = authenticateMiddleware;
