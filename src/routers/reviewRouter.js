

const router = require("express").Router({mergeParams: true});
const { auth } = require("../controllers/authControllers");
const { validateBook } = require("../middlewares/validate");
const { createReview, readAllReviews, readReviews,
    readReview, deleteReview, updateReview } = require("../controllers/reviewControllers");



router.route("/")
.get(validateBook, readReviews) // read all reviews from a single book
.post(auth, validateBook, createReview) // create a review for a book

router.route("/:rId")
    .get(validateBook, readReview) // read a single review
    .delete(auth,validateBook, deleteReview) // delete a single review
    .put(auth,validateBook, updateReview) // update a single review

module.exports = router;







