function isNotLoggedMiddleware(req, res, next) {
    if (!res.locals.user) {
        res.redirect("/users/login");
    } else {
        next();
    }
}

module.exports = isNotLoggedMiddleware;

// Si el usuario no está logueado, lo redirige al login