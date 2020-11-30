const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", [
    __dirname + "/views",
    __dirname + "/views/users",
    __dirname + "/views/products",
    __dirname + "/views/partials",
]);

app.use(express.static("public"));

const mainRoutes = require("./routes/mainRoutes");
const loginRoutes = require("./routes/loginRoutes");
const registerRoutes = require("./routes/registerRoutes");
const productRoutes = require("./routes/productRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");

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
