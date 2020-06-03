

const passport=require('./passport')

exports.loginGoogle = passport.authenticate("google")

exports.googleAuth = function(req, res, next){
    passport.authenticate("google",function(err, user){
if(err)return res.send("ERROR");
// return res.send(user)
return res.redirect(`https://localhost:3000/?token=${user.tokens[user.tokens.length-1]}`)
})(req, res, next);
}
