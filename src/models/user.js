const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');




const schema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "USERNAME is required."],
        trim: true,
        minLength: 3
    },
    email: {
        type: String,
        required: [true, "USER's EMAIL is required."],
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value);
            }
        }
    },
    about:{
        type: String,
        default:"not specified"
    },
    gender:{
        type:String,
        required: [true, "USER'S GENDER is required"], 
        lowercase: true,
        enum : ['male','female','other', 'not specified'],
        default:"not specified"
            },

    bookcollection:{
        type: Array
    },
    password: {
        type: String,
    },
    tokens: [String]
}, {
    timestamps: true
});


    
schema.statics.loginWithCredentials = async (email, password) => {
    const user = await User.findOne({ email: email });
    if (!user) throw new Error("USER not found");
    const allow = await bcrypt.compare(password.toString(), user.password);
    console.log("YOUR EMAIL", email, "YOUR PASSWORD", password)
    if (!allow) throw new Error("incorrect password")
    return user
}

schema.methods.generateToken = async function () {
    const jsonToken = jwt.sign({ email: this.email, id: this._id }, process.env.SECRET);
    this.tokens.push(jsonToken);
    await this.save();
    return jsonToken
}

schema.methods.toJSON = function () {
    let newObj = this.toObject();
    delete newObj.password;
    delete newObj.__v;
    return newObj;
};

schema.pre('save', async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
});

schema.pre("findOneAndUpdate", async function (next) {
    if (!this._update.password) return next();
    this._update.password = await bcrypt.hash(this._update.password.toString(), saltRounds);
    next();
})  

schema.statics.findOneOrCreate = async ( {name, email} ) => {
    // console.log("fb name",name)
    // console.log("fb email ",email)
    console.log("google name",name)
    console.log("google email ",email)
    let user = await User.findOne({ email })
    if (!user) {    
        user = await User.create({ email, name });
    }   
    user.token = await user.generateToken();
    return user
}
    

const User = mongoose.model('User', schema);
module.exports = User
