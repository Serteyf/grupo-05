const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", [
    __dirname + "/site/views",
    __dirname + "/site/views/users",
    __dirname + "/site/views/products",
    __dirname + "/site/views/partials",
]);

app.use(express.static("site/public"));

const mainRoutes = require("./site/routes/mainRoutes");
const loginRoutes = require("./site/routes/loginRoutes");
const registerRoutes = require("./site/routes/registerRoutes");
const productRoutes = require("./site/routes/productRoutes");
const checkoutRoutes = require("./site/routes/checkoutRoutes");

app.listen(3000, () => {
    console.log("Server running on port 3000.");
});

app.use("/", mainRoutes);
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);
app.use("/product", productRoutes);
app.use("/checkout", checkoutRoutes);

app.use((req, res, next) => {
    res.status(404).render("not-found");
});
