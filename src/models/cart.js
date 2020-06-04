const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  lender: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "user/lender is required"],
  },
  borrower:{
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "user/borrower is required"],
  },
  book: {
    type: mongoose.Schema.ObjectId,
    ref: "Book",
    required: [true, " book is required"],
  },
  status: {
    type: String,
    required: [true, "Status is required"],
    lowercase: true,
    enum: ['pending', 'confirmed', 'incompleted', 'completed'],
    default:"pending"
  },
  from: {
    type: String,
    required: [true, "you need to specify the start of your borrowing period"]
  },
  to: {
    type: String,
    required: [true, "you need to specify the end of your borrowing period"]
  },
  firstname: {
    type: String,
    required: [true, " first name is required"],
  },
  lastname: {
    type: String,
    required: [true, " last name is required"],
  },
  address: {
    type: String,
    required: [true, " address is required"],
  },
  message: {
    type: String,
  },

}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});


const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;   