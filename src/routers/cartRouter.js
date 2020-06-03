const router = require("express").Router();
const {auth}=require("../controllers/authControllers");

const {createCart}=require("../controllers/cartControllers");

router.route("/createcart")
.post(auth, createCart) 
router.route("/")

module.exports = router;
