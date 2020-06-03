const User = require("../models/user");
const { updateOne } = require("./factories");
const catchAsync= require("../utils/catchAsync");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");

exports.readProfile = async function (req, res) {
    res.json({status:true, user:req.user})
};


exports.createUser = async function (req, res) {
    try {
        const user = await User.create({ 
name: req.body.name, email: req.body.email, password: req.body.password,
about: req.body.about, gender: req.body.gender
});
        return res.status(201).json({ status: 'Successfully created USER', data: user })
    } catch (err) {
        return res.status(400).json({ status: "fail to create USER", error: err.message })
    }
}

exports.readUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ status: "successfully show ALL USERS!", data: users });
    } catch (error) {
        res.status(400).json({ status: "fail to show ALL USERS!", message: error.message });
    };
};


exports.readSingleUser = async (req, res) => {
    try {
        const { uId } = req.params;
        const singleUser = await User.findById(uId);
        res.status(200).json({ status: "successfully show USER!", data: singleUser });
    } catch (error) {
        res.status(400).json({ status: "fail to show USER!", message: error.message });
    };
};
exports.deleteUser = async (req, res) => {
    const { uId } = req.params;
    try {
        await User.findByIdAndDelete(uId)
        return res.status(204).json({ status: "Successfully deleted USER", data: null })
    }
    catch (er) {
        return res.status(400).json({ status: "failed to delete USER", error: err.message })
    }
}



exports.resetPassword= catchAsync( async (req,res,next)=>{
    const {email}=req.params;
    console.log("email for reset password:",email)
    if(!email) return next(new AppError(400,"need to provide email"));
    const user = await User.findOne({email:email})
    if(!user) return res.status(200).json({status:"failed",data:null});
    const token = jwt.sign({email:user.email},process.env.SECRET) // (payload, signature)
    
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_KEY);
    const msg = {
        to: user.email,
        from: 'elysiawepts25@gmail.com',
        subject: 'Forgot password confirmation /reset password request',
        html: ` Click <a href="{https://localhost:3000/email/${token}}">this link</a> to reset your password.`,
    };
    sgMail.send(msg);
    return res.status(200).json({status:"success",data:null});
    })
    

    exports.changePassword = catchAsync(async function(req,res,next){
        const {token}=req.params;
        const {password }=req.body;
        const decoded = jwt.verify(token,process.env.SECRET) //verify(token, signature)
        const user = await User. findOne({email:decoded.email})
        user.password = password;
        user.save()
        res.status(200).json({status:"success",data: user})
        })
        

exports.updateUser = updateOne(User)
