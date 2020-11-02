const express = require("express");
const app = express();
const path = require("path");

// Hace que los archivos de /public se vuelvan disponibles para el HTML
app.use(express.static("site/public"));

app.listen(3000, () => {
  console.log("Server running on port 3000.");
});

app.all("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "site/views/index.html"));
});

app.all("/login", (req, res) => {
  res.sendFile(path.resolve(__dirname, "site/views/login.html"));
});

app.all("/register", (req, res) => {
  res.sendFile(path.resolve(__dirname, "site/views/register.html"));
});

app.get("*", (req, res) => {
  res.send("Houston, tenemos un error 404!");
});
