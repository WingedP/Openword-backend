

const passport=require('./passport')

exports.loginGoogle = passport.authenticate("google"
// , { scope: [ 'email', 'profile' ] }
)

exports.googleAuth = function(req, res, next){      
    passport.authenticate("google",function(err, user){
console.log("err err err",err)
if(err)return res.send("ERROR");
// return res.send(user)
return res.redirect(process.env.CLIENT+`/?token=${user.tokens[user.tokens.length-1]}`)
// return res.redirect(`https://openword-temp.netlify.app/?token=${user.tokens[user.tokens.length-1]}`)

})(req, res, next);
}

