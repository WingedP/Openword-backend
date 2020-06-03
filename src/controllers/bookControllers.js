const Book = require("../models/book");
const Category = require("../models/category");
const {deleteOne, updateOne}= require("./factories");
const catchAsync=require('../utils/catchAsync')
const AppError=require('../utils/appError');

exports.createBook = catchAsync(async function (req, res,next) {
    const book = await Book.create({...req.body,
          title: req.body.title,
          description: req.body.description,
          // category:req.cat._id,
          category:req.body.category,
          owner: req.user._id });
        res.status(201).json({status: "Successfully CREATED BOOK!", data: book });
    });

exports.readmybook = catchAsync (async function (req, res,next) {
  const book = await Book.find({
    owner:req.user._id 
  })
    res.status(200).json({status: "Successfully get my book!", data: book });
  });

exports.readBooks = async function (req, res, next) {
        try {
          const filters = { ...req.query };
          const page = req.query.page * 1 || 1;
          const limit = req.query.limit * 1 || 2;
          const skip = (page - 1) * limit;
          const paginationKeys = ["limit", "page", "sort"];
          paginationKeys.map(el => delete filters[el]);
    
          let query =  Book.find(filters);
          query = query.skip(skip).limit(limit);
          if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            query.sort(sortBy)
          };

          const books = await query;
          const booksCount = await query.find().countDocuments();
          if (req.query.page && skip > booksCount)
          return next(new AppError(400, "Page number out of range"))
          res.json({ status: "success",bookAmount:booksCount, data:books });
        } catch (error) { 
          res.status(400).json({ status: "fail", message: error.message });
        } 
    };

exports.readSingleBook = async (req, res) => {
      try {
        const { bId } = req.params;
        const book = await Book.findById(bId)
        if (!book) return res.status(404).json({ status: "fail", message: "Book not found" });
        res.json({ status: "success", data: book });
      } catch (err) {
        res.status(400).json({ status: "fail", message: err.message });
      };
    };
exports.readBooksInCat = async (req, res) => {
  try {
    const books = await Book.find({category:req.cat._id});
    const booksCount = await Book.find({category:req.cat._id}).countDocuments();
    if (!books) return res.status(404).json({ status: "fail", message: "BOOK not found." });
    res.json({ status: "success",booksCount:booksCount, data: books });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  };
};

exports.deleteBook=deleteOne(Book);
exports.updateBook=updateOne(Book);