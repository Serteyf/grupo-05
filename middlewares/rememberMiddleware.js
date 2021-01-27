const getUsers = require("../utils/getUsers");

function rememberMiddleware(req, res, next) {

    if (req.cookies.remember) {
        
        const users = getUsers();

        const loggedUser = users.find((user) => {
            return user.id == req.cookies.remember;
        });

        res.locals.user = loggedUser;
        next();
    } else {
        next();
    }
}

module.exports = rememberMiddleware;

