

const passport=require('./passport')

exports.loginFacebook = passport.authenticate("facebook", { scope: [ 'email' ] })

exports.facebookAuth = function(req, res, next){
    passport.authenticate("facebook",function(err, user){
if(err)return res.send("ERROR");
// return res.send(user)
return res.redirect(`https://localhost:3000/?token=${user.tokens[user.tokens.length-1]}`)
})(req, res, next);
}