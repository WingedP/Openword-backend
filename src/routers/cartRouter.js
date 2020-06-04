const router = require("express").Router();
const {auth}=require("../controllers/authControllers");
const {validateBook} =require("../middlewares/validate")
const {createCart , updateCart }=require("../controllers/cartControllers");

router.route("/createcart")
.post(auth, validateBook , createCart) //create cart
router.route("/updatecart")
.post(auth , updateCart) //update cart


module.exports = router;
