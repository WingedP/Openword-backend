
const mongoose=require("mongoose");


const reviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "BOOK's name is required"],
        trim: true,
    },
    content: {
        type: String,
        required: [true, "BOOK's review is required"],
        trim: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,     
        ref: "User",
        required: [true, "USERNAME of the one who writes review is required"]
    },
    book: {
        type: mongoose.Schema.ObjectId,     
        ref: "Book",
        required: [true, "REVIEW's BOOK is required"]
    },
    rating: {
        type: Number,
        required: [true, "BOOK'S REVIEW needs a rating"],
        min: 1,
        max: 5
      }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// schema.pre(/^find/, function (next) {
//     this.populate("tour", "title")
//     next();});


//FUNCTION FOR CALCULATING RATING
reviewSchema.statics.calculateAvgRating = async function(bookId){
const stats= await this.aggregate([
{$match:{ book: bookId }}, //eg.found 5 docs
{$group: {  
_id: "$book", //grab the value from $match   
ratingQuantity: {$sum:1}, //5docs
ratingAverage: {$avg: "$rating"}    
} }
])
await mongoose.model("Book").findByIdAndUpdate(bookId,{
    ratingAverage: stats.length===0 ? 0 : stats[0].ratingAverage,
    ratingQuantity: stats.length===0 ? 0 : stats[0].ratingQuantity
})
}

//UPDATE RATING WHEN CREATED?   
reviewSchema.post("save",function(next){
    this.constructor.calculateAvgRating(this.book)
})
//UPDATE RATING WHEN DELETE/UPDATE?
reviewSchema.pre(/^findOneAnd/,async function(next){ 
this.doc = await this.findOne();
next()
})  
reviewSchema.post(/^findOneAnd/,async function(){
this.doc.constructor.calculateAvgRating(this.doc.book)
})


const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;  