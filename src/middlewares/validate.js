
const Book = require("../models/book");
const Category = require("../models/category");

exports.validateCatParams = async function (req, res, next) {
    const catId = req.params.cId;
    try {
        const cat = await Category.findById(catId);
        if (!cat) return res.status(404).json({ status: "failed to get CATEGORY ID", error: "ERROR!" });
        req.cat = cat;
        next()
    } catch (error) { return res.status(500).json({ status: "failed to get CATEGORY ID", error: "too bad" }); }
}



exports.validateBook = async function (req, res, next) {
    const bookId = req.params.bId;
    // console.log("TOUR ID from validate.js :", tourId)
    try {
        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ status: "failed to get BOOK ID", error: "ERROR!" });
        req.book = book;
        next()
    } catch (error) { return res.status(500).json({ status: "failed to get BOOK ID", error: err.message }); }
}

