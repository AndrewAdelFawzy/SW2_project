const router = require("express").Router() 
const protector = require("./routers protector/authorityProtector")

bodyParser = require("body-parser")
const bodyParserMW = bodyParser.urlencoded({extended: true})

const authControl = require("../controllers/authorityController")

const check = require("express-validator").check


router.get("/signup" , protector.isUserNotLogin, authControl.getSignup)     

router.post("/signup", bodyParserMW,                      // Note that , "/signup" detected by Form Action
    check("username").not().isEmpty().withMessage("username is required"),
    check("email").not().isEmpty().withMessage("email is required").isEmail().withMessage("invalid email format"),
    check("pass").not().isEmpty().isLength( {min:6} ).withMessage("at least 6 chars") ,
    check("confirmpass").custom( (value,{req})=>{
        if (value === req.body.pass) return true
        else throw "the 2 passwords are not the same"
    } ).withMessage("the 2 passwords are not the same"), 

    authControl.postSignup
    )     

router.get("/login" , protector.isUserNotLogin ,  authControl.getLogin ) 

router.post("/login" , bodyParserMW, authControl.postLogin )

router.all("/logout", protector.isUserLogin ,authControl.logout)





//----------------- Admin Pages ------------------//   




const multer = require("multer")



router.get("/addCollege" , protector.isUserAdmin , authControl.getAddCollege) 






router.post("/addCollege" , protector.isUserAdmin , multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "images/");
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "-" + file.originalname);
        }
    })
}).single("image") , 

check("image").custom((value, { req }) => {
    if (req.file) return true;
    else throw "image is required";
}) ,authControl.postAddCollege)






module.exports = router