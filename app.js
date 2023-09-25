const express = require("express");
const methodOverride = require("method-override");
const app = express();
let { engine } = require("express-handlebars");
const exphbs = engine;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// This line must appear after the app = express() declaration.
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

mongoose.connect("mongodb+srv://superskl5000:BE5IorpNY0Z6ApoV@100devs.c7wjvtf.mongodb.net/rotten-potatoes?retryWrites=true&w=majority", { useNewUrlParser: true});

const Review = new mongoose.model("Review", {
    title: String,
    movieTitle: String,
    description: String,
});

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");


// let reviews = [
//     { title: "Great Review", movieTitle: "Batman II", releaseYear: 2012},
//     { title: "Awesome Movie", movieTitle: "Titanic", releaseYear: 2000 }
// ]

app.get("/", async(req, res) => {
    try {
        const reviews = Review.find().lean()
        res.render("reviews-index", { reviews: reviews });
    } catch (error) {
        console.log(error);
    }
    
})

app.get("/reviews/new", async(req, res) => {
    try {
        res.render("reviews-new", {title: "New Review"});
    } catch (error) {
        console.log(error)
    }
});

app.post("/reviews", async(req, res) => {
    try {
        const review = await Review.create(req.body);
        console.log(review);
        res.redirect(`/reviews/${review._id}`);
    } catch (error) {
        console.log(error);
    }
});

app.get("/reviews/:id", async(req, res) => {
    try {
        const review = await Review.findById({
            _id: req.params.id}).lean()
        res.render("reviews-show", { review: review });
    } catch (error) {
        console.log(error);
    }
})
app.get("/reviews/:id/edit", async(req, res) => {
    try {
        const review = await Review.findById({
            _id:req.params.id}).lean()
        res.render("reviews-edit", { review: review, title: "Edit Review" });
    } catch (error) {
        console.log(error);
    }
});

app.put("/reviews/:id", async(req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body);
        res.redirect(`/reviews/${review._id}`);
    } catch (error) {
        console.log(error);
    }
});

app.delete("/reviews/:id", async(req, res) => {
    try {
        console.log("Deleted")
        const review = await Review.findByIdandRemove({_id: req.params.id}).lean()
    } catch (error) {
        
    }

})

// app.get("/", (req, res) =>{
//     res.status(200).render("home", {msg: "Handlebars are Cool!"});
// })

app.listen(8080, () => {
    console.log("App is listening on Port 8080")
})