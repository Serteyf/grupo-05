const express = require("express");
const app = express();

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

app.get("*", (req, res) => {
    res.send("Houston, tenemos un error 404!");
});
