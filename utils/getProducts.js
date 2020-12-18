const fs = require("fs");
const path = require("path");

const getProducts = (req, res) => {
    const dbJson = fs.readFileSync(
        path.resolve(__dirname, "../data/products.json"),
        { encoding: "utf-8" }
    );
    return JSON.parse(dbJson);
};

module.exports = getProducts;
