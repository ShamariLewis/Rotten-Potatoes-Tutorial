const Review = require("../models/reviews");

module.exports = function(app, Review) {
    app.get("/", (req, res) => {
        Review.find()
            .then(reviews => {
                res.render("reviews-index", { reviews: reviews;})
            })
            .catch(err => {
                console.log(err)
            });
    });

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
}