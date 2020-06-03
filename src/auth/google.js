

const passport = require('passport-google-oauth2');
const google = passport.Strategy
const User = require('../models/user')


module.exports = (new google({
    clientID: process.env.GG_ID,
    clientSecret: process.env.GG_SECRET,
    callbackURL: process.env.DOMAIN + process.env.GG_CB,
    scope:["email","profile"]
},

async function (accessToken, refreshToken, profile, cb) {
        console.log("GOOGLE's profile._json :", profile._json)
    
        
        const {name, email}= profile._json
        const user = await User.findOneOrCreate({name, email})
        cb(null, user)
    }
))