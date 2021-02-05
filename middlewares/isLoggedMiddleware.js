function isLoggedMiddleware(req, res, next) {
    if (res.locals.user) {
        res.redirect("/");
    } else {
        next();
    }
}

module.exports = isLoggedMiddleware;

// Si el usuario ya está logueado, evita ciertas rutas (login y register) y redirige al home
