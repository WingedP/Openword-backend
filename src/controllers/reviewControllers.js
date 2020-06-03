
const Review = require("../models/review");
// const Tour = require("../models/tour");
const {deleteOne, updateOne}= require("./factories");


//READ ALL REVIEWS FROM ALL BOOKS: 
exports.readAllReviews = async function (req, res){
    try{
        const reviews = await Review.find(); 
        const reviewCount = await Review.find().countDocuments();
        res.status(201).json({ status: "success", data: reviews,reviewCount })
    }catch(error){res.status(400).json({ status: "fail", message: error.message });
    }
}

//READ ALL REVIEWS FROM 1 BOOK: 
exports.readReviews = async function (req, res){
  const bookId = req.params.bId
try{   
    const reviewNumPerBook = await Review.find({book:bookId}).countDocuments();
    const reviewFromOneBook=await Review.find({book:bookId})
    .populate("reviews") .populate("user","_id name email");
    res.status(200).json({ status: "success", numberOfReview:reviewNumPerBook, data: reviewFromOneBook})
}catch(error){res.status(500).json({ status: "fail", message: error.message });
}};

//READ A SINGLE REVIEW: 
exports.readReview = async function (req, res){
try{
  const singleReview = await Review.findOne({_id: req.params.rId})
  res.status(201).json({ status: "success", data: singleReview })
}catch(error){   res.status(400).json({ status: "fail", message: error.message });
}
}

//CREATE A REVIEW: 
exports.createReview = async function (req, res) {
    try {
      const review = await Review.create({
        title:req.body.title,
        content:req.body.content,
        rating:req.body.rating,
        book:req.book._id,
        user: req.user._id,
        })
      res.status(201).json({ status: "Successfully created REVIEW!", data: review })
    } catch (error) {
      res.status(500).json({ status: "Failed to create REVIEW!", message: error.message });
    }
};

//DELETE & update A REVIEW (with factories):
exports.deleteReview=deleteOne(Review);
exports.updateReview=updateOne(Review);














