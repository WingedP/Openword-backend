const passport = require('passport');
const facebookStrategy=require('./facebook')
const googleStrategy=require('./google')
const githubStrategy=require('./github')

passport.use(googleStrategy)
passport.use(facebookStrategy)
passport.use(githubStrategy)

module.exports=passport;