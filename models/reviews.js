const mongoose = require("mongoose");

const Review = new mongoose.model("Review", {
    title: String,
    movieTitle: String,
    description: String,
})