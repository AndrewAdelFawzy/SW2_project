const modelUniversity = require("../models/university")    // Import (DB Page) , to use its function

exports.getColleges = (req,res,next)=>{

    let id = req.params.id

    modelUniversity.getCollegeById(id).then( (college)=>{
        res.render("collegeDetails" ,  {college:college , isUser : req.session.userId , invalid : req.flash( "validErrors")[0], isAdmin : req.session.isAdmin })        // new page 
    } )
}