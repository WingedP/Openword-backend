const catchAsync = require("../utils/catchAsync");
const {deleteOne, updateOne}= require("./factories");
const AppError = require("../utils/appError");
const Cart = require("../models/cart");
const Book = require("../models/book");

exports.createCart = catchAsync(async function(req,res,next){

try{ 
    console.log("createCart is running")

    const cart = await Cart.create({ 
    borrower:req.user._id,
    lender: req.book.owner, 
    book: req.book._id,
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    status: req.body.status,    
    from: req.body.from,
    to: req.body.to,
    address: req.body.address, 
    message: req.body.message, 
    });
return res.status(201).json({status: "Successfully CREATED CART!", data: cart });
} catch(err){
return res.status(400).json({ status: "fail to CREATE CART.", error: err.message })
}
})


//READ ALL CARTS FROM 1 USER? 
exports.readUserCart = catchAsync(async function(req,res,next){
try { 
const cart = await Cart.find({borrower:req.user._id })
.populate("user lender borrower","name email title")
.populate("book","-category -ratingAverage -_id -ratingQuantity")
;
    return res.status(200).json({status: "Successfully GET CART DATA!", data: cart });
    } catch(err){
    return res.status(400).json({ status: "fail to READ USER CART.", error: err.message })
    }
})



exports.readBookDetail = catchAsync(async function(req,res,next){
try{
    const { bId } = req.params;
    const book = await Book.findById(bId) 
    if (!book) return res.status(404).json({ status: "fail", message: "Book not found" });
    res.json({ status: "success", data: book });
}
catch(err){ res.status(400).json({ status: "fail", message: err.message });}
})

exports.deleteSingleCart=deleteOne(Cart);
exports.updateCart=updateOne(Cart);