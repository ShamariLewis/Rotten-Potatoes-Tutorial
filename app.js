const express = require("express");
const app = express();
let { engine } = require("express-handlebars");
const exphbs = engine;

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.get("/", (req, res) =>{
    res.status(200).render("home", {msg: "Handlebars are Cool!"});
})

app.listen(8080, () => {
    console.log("App is listening on Port 8080")
})