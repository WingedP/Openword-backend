const express=require("express");
require("dotenv").config();
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const passport = require("./src/auth/passport")
const cors = require("cors");
const { auth } = require("./src/controllers/authControllers");
const {  readAllReviews } = require("./src/controllers/reviewControllers");

//ROUTER IMPORT
const userRouter = require("./src/routers/userRouter");
const authRouter = require("./src/routers/authRouter");
const catRouter = require("./src/routers/catRouter");
const bookRouter = require("./src/routers/bookRouter");
const reviewRouter = require("./src/routers/reviewRouter");
const cartRouter = require("./src/routers/cartRouter");

mongoose.connect(process.env.DB_LOCAL,{
    useCreateIndex: true, 
    useNewUrlParser: true, 
    useFindAndModify: false, 
    useUnifiedTopology: true 
}).then(()=>console.log("successfully connected to ur database!")).catch(err=>console.log(err))

const app=express();
const router=express.Router();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(router);

// // RUNNING ROUTERS HERE:
router.get("/",(req,res)=>{res.status(200).json({status:"HOME ROUTE OK", data:[]})})
router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/category", catRouter); 
router.use("/books", bookRouter);
router.use("/books/:bId/reviews", reviewRouter);
router.use("/cart", cartRouter);
router.route("/reviews/all").get(readAllReviews)  //read all reviews from all tours




const AppError=require('./src/utils/appError');
function notFound(req, res, next) {
next(new AppError("404","API NOT FOUND"))
}
router.route("*").all(notFound)

//ERROR HANDLERS to capture all errors
const errorHandler=require('./src/utils/errorHandler');
app.use(errorHandler)

module.exports = app;


