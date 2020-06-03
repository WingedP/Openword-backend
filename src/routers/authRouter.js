

//AUTHENTICATION/LOGIN/LOGOUT ROUTES:

const { auth, login, logout, logoutAll } = require("../controllers/authControllers");
const router = require("express").Router();

const { loginFacebook, facebookAuth } = require("../auth/facebookHandler")
const { loginGoogle, googleAuth } = require("../auth/googleHandler")
const { loginGithub, githubAuth } = require("../auth/githubHandler")
    
router.get("/facebook", loginFacebook)
router.get("/facebook/authorized", facebookAuth)
router.get("/google", loginGoogle)  
router.get("/google/authorized", googleAuth)
router.get("/github", loginGithub)
router.get("/github/authorized", githubAuth)


router.route("/login")
.post(login)

router.get("/logout", auth, logout);
router.get("/logoutAll", auth, logoutAll)

module.exports = router;
