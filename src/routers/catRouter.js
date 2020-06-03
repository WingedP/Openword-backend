const router = require("express").Router();
const {auth}=require("../controllers/authControllers");


const {readCategories, readSingleCategory, createCategory, 
deleteCategory, updateCategory}=require("../controllers/categoryControllers");
const catchAsync=require('../utils/catchAsync')

    router.route("/")
    .get(readCategories) //read all categories
    .post(auth, createCategory) //create a category

    router.route("/:cId")
    .get(readSingleCategory) //read 1 category
    .delete(auth, deleteCategory) //delete 1 category
    .put(auth, updateCategory) //update 1 category






    module.exports = router;
