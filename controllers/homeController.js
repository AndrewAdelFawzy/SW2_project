const modelUniversity = require("../models/university")         // Import (DB Page) , to use its functions


exports.homeget = (req,res,next)=>{         // Export 


    let field = req.query.field

    if (field && field !== "all" ) {
        modelUniversity.getFilteredColleges(field).then(colleges=>{          
            res.render("index" , { colleges : colleges , isUser : req.session.userId , invalid : req.flash( "validErrors")[0], isAdmin : req.session.isAdmin } )               
        })
    } else {
        modelUniversity.getColleges().then(colleges=>{                          
            res.render("index" , { colleges : colleges,  isUser : req.session.userId,  invalid : req.flash( "validErrors")[0], isAdmin : req.session.isAdmin } )  // Pass the data to index.ejs 
            
        })
    }

    
}
