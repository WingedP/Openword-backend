const router=require("express").Router();
const {auth}=require("../controllers/authControllers");
const { validateCatParams }=require("../middlewares/validate");
const {readBooks, readmybook, readSingleBook,readBooksInCat, 
createBook, deleteBook, updateBook}=require("../controllers/bookControllers");

router.route("/").get(readBooks) // read all books
// router.route("/:cId").post(auth, validateCatParams, createBook) //create a book

router.route("/addbook").post(auth, createBook) //create a book
router.route("/mybook").get(auth, readmybook)
router.route("/:cId/book").get(validateCatParams, readBooksInCat) // read all books from 1 category
router.route("/:bId")
.get(readSingleBook) //read a single book
.delete(auth, deleteBook) //delete a book
.put(auth, updateBook) //update a book




module.exports = router;