
const passport = require('passport-facebook');
const facebookStrategy = passport.Strategy
const User = require('../models/user')

module.exports = (new facebookStrategy({
    clientID: process.env.FB_ID,
    clientSecret: process.env.FB_SECRET,
    callbackURL: process.env.DOMAIN + process.env.FB_CB,
    profileFields:["id", "email","name","photos"]
},

    async function (accessToken, refreshToken, profile, cb) {
        console.log("FACEBOOK's profile._json :", profile._json)
        const {email} = profile._json;
        let name = profile._json.first_name + ' ' + profile._json.last_name
        const user = await User.findOneOrCreate({name, email})

        // let name = profile._json.first_name + profile._json.last_name
        // const {email}= profile._json 
        // const user = await User.findOneOrCreate(name, email);

        cb(null, user)
    }
))