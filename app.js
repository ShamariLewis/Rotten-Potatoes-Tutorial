const express = require("express");
const app = express();
let { engine } = require("express-handlebars");
const exphbs = engine;

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");


let reviews = [
    { title: "Great Review", movieTitle: "Batman II"},
    { title: "Awesome Movie", movieTitle: "Titanic" }
]

app.get("/", (req, res) => {
    res.render("reviews-index", { reviews: reviews });
})

// app.get("/", (req, res) =>{
//     res.status(200).render("home", {msg: "Handlebars are Cool!"});
// })

app.listen(8080, () => {
    console.log("App is listening on Port 8080")
})