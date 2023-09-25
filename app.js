const express = require("express");
const app = express();
let { engine } = require("express-handlebars");
const exphbs = engine;
const mongoose = require("mongoose");


mongoose.connect("mongodb+srv://superskl5000:BE5IorpNY0Z6ApoV@100devs.c7wjvtf.mongodb.net/rotten-potatoes?retryWrites=true&w=majority", { useNewUrlParser: true});

const Review = new mongoose.model("Review", {
    title: String,
    movieTitle: String
});

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");


// let reviews = [
//     { title: "Great Review", movieTitle: "Batman II", releaseYear: 2012},
//     { title: "Awesome Movie", movieTitle: "Titanic", releaseYear: 2000 }
// ]

app.get("/", async(req, res) => {
    try {
        const reviews = Review.find()
        res.render("reviews-index", { reviews: reviews });
    } catch (error) {
        console.log(error);
    }
    
})

// app.get("/", (req, res) =>{
//     res.status(200).render("home", {msg: "Handlebars are Cool!"});
// })

app.listen(8080, () => {
    console.log("App is listening on Port 8080")
})