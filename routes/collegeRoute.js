const router = require("express").Router();

const collegeController = require("../controllers/collegeController") //import

router.get("/:id" , collegeController.getColleges) 


module.exports = router                                         