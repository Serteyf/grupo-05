const fs = require("fs");
const path = require("path");

const getUsers = (req, res) => {
    const dbJson = fs.readFileSync(
        path.resolve(__dirname, "../data/users.json"),
        { encoding: "utf-8" }
    );
    return JSON.parse(dbJson);
};

module.exports = getUsers;
