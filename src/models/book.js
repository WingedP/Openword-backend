

const mongoose=require("mongoose");


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "TITLE OF BOOK is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "BOOK's DESCRIPTION is required"],
        trim: true,
      },
    category: [{
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: [true, "BOOK's CATEGORY is required"],
        trim: true,
      }],
    author:{
        type: String,
        required: [true, "BOOK's AUTHOR is required"],
        trim: true,
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "BOOK'S OWNER is required"]
      },
    price: {
        type: Number,
        required: [true, "Book needs BORROWING PRICE"],
        min: [0,"BORROWING PRICE can be free/0 at lowest"]
      },
    ratingAverage: {
        type: Number,
        default: 0,
        min: [0, "Rating must be above 0"],
        max: [5, "Rating must be below 5.0"],
        set: value => Math.round(value * 10) / 10
      },
    ratingQuantity: {
        type: Number,
        default: 0
      },    
    availability: {
        type: Boolean,
        required: [true, "Need to specify if your book is available (for borrowing) or not."]
      },
    until:{
      type:String,
      required: [true, "How long it is gonna be available?"]
    },
    thumbnail:{
      type:String,
      required: [true, "BOOK'S THUMBNAIL/PICTURE is required."]

    },
    condition:{
        type:String,
        required: [true, "BOOK'S CONDITION is required"], 
        enum : ['Like-new','Excellent','Good', 'Acceptable', 'Moderate']
            }
},{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})




bookSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'book',
});

bookSchema.pre(/^find/, function (next) {
  this
    .populate("owner", "name")
    .populate("category", "category")
  next(); 
});



const Book = mongoose.model("Book", bookSchema);
module.exports = Book;