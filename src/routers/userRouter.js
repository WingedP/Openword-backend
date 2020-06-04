

const router = require("express").Router();
const {auth}=require("../controllers/authControllers");

const {readSingleBook}=require("../controllers/bookControllers");
const {readUserCart}=require("../controllers/cartControllers");
const {readBookDetail}=require("../controllers/cartControllers");

const {readProfile, updateProfile, createUser, readUsers, readSingleUser, deleteUser, 
    updateUser, resetPassword, changePassword}=require("../controllers/userControllers");

router.route("/me")
.get(auth, readProfile)

router.route("/me/history").get(auth, readUserCart) //READ user's history/cart of borrowing/lending

router.route("/books/borrowingform/:bId").get(readBookDetail) //read book detail in borrowingform page
router.route("/books/:bId").get(readSingleBook) //read a single book in userRouter

router.route("/:uId")
.get(readSingleUser)
.delete(auth,deleteUser)
.put(auth,updateUser)

router.route("/")   
.post(createUser)
.get(readUsers)

module.exports = router;
            