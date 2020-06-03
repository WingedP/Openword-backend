
const passport=require('passport');
const User = require('../models/user');

exports.loginGithub = passport.authenticate("github")

exports.githubAuth = function(req, res, next){
    passport.authenticate("github",function(err, user){
    if(err) res.send("ERROR");
    // res.send(user)
    // return res.redirect(`https://localhost:3000/?token=${user.tokens.[user.tokens.length-1]}`)
    return res.redirect (`https://localhost:3000/?token=${user.tokens[user.tokens.length-1]}`)
    })(req, res, next);
}

