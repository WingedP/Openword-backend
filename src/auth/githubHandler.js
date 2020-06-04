
const passport=require('passport');
const User = require('../models/user');

exports.loginGithub = passport.authenticate("github")

exports.githubAuth = function(req, res, next){
    passport.authenticate("github",function(err, user){
    if(err) res.send("ERROR");
    return res.redirect(process.env.CLIENT+`/?token=${user.tokens[user.tokens.length-1]}`)

    })(req, res, next);
}

    