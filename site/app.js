const express = require("express");
const app = express();
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require('cookie-parser');
const authenticateMiddleware = require('./middlewares/auth/authenticateMiddleware')
const rememberMiddleware = require('./middlewares/rememberMiddleware')

app.set("view engine", "ejs");
app.set("views", [
    __dirname + "/views",
    __dirname + "/views/users",
    __dirname + "/views/products",
    __dirname + "/views/partials",
]);

app.use(express.static("public"));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(methodOverride("_method"));

app.use(session({ secret: "Mensaje secreto" }));

app.use(cookieParser())
app.use(authenticateMiddleware)
app.use(rememberMiddleware)

const mainRoutes = require("./routes/mainRoutes");
const usersRoutes = require("./routes/usersRoutes");
const productRoutes = require("./routes/productRoutes");
const apiProducts = require("./routes/api/products");
const checkoutRoutes = require("./routes/checkoutRoutes");

app.listen(3000, () => {
    console.log("Server running on port 3000.");
});

app.use("/", mainRoutes);
app.use("/users", usersRoutes);
app.use("/products", productRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/api/products", apiProducts);

// Setea 'user' dentro de locals para usarla despues
app.locals.user = null;

app.use((req, res, next) => {
    res.status(404).render("not-found");
    next();
});
