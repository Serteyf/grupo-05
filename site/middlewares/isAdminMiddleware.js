function isAdminMiddleware(req, res, next) {
    if (res.locals.user == undefined || !res.locals.user.categoryId == 2) {
        res.redirect("/users/login");
    } else {
        next();
    }
}

module.exports = isAdminMiddleware;
