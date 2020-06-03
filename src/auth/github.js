

const passport = require('passport-github');
const githubStrategy = passport.Strategy
const User = require('../models/user')

module.exports = (new githubStrategy({
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    callbackURL: process.env.DOMAIN + process.env.GH_CB,
    scope:["user: email"]
},

function (accessToken, refreshToken, profile, cb) {
       console.log("GITHUB PROFILE",profile)
        if (!profile._json.email) {
        request({
            url: 'https://api.github.com/user/emails',
            json: true,
            headers: {
            'user-agent': 'my user-agent',
            authorization: `token ${accessToken}`
            }}, (err, data) => {
                const user = {username: profile.username, email: data[0].email};   
                console.log("USER????",data)
                cb(null, user);
            })
        } else {
        cb(null, profile._json)
    }
 





    
    // console.log("is running")
    // console.log(profile)
    // profile._json.email = profile.emails[0].value
    //     cb(null, profile)

    }

))


 