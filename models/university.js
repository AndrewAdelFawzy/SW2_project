const mongoose = require("mongoose");

const DB_URL = "mongodb://localhost:27017/university";
   
const collegeSchema = mongoose.Schema( {    //Schema is : object Constructor
    name : String,
    about : String,
    field : String,
    image : String
} )

const college = mongoose.model("college",collegeSchema);  // model is : object Constructor  [ new College({schema}) ]

var promise = require('promise');

class connection {
    connetDB(){
        return  mongoose.connect(DB_URL);
    }
    disConnetDB(){
        return mongoose.disconnect();
    }
}
const CONNECTION = new connection();



exports.getColleges = ()=>{                        
    return new promise( (resolve,reject) => {
        CONNECTION.connetDB().then(()=>{ return college.find({}) }).then(colleges =>{
            CONNECTION.disConnetDB();
            resolve(colleges)
        }).catch(err=>{reject(err)})
    } )
}



exports.getFilteredColleges = (field)=>{                         
    return new promise( (resolve,reject) => {
        CONNECTION.connetDB().then(()=>{ return college.find({field:field}) }).then(colleges =>{
            CONNECTION.disConnetDB();
            resolve(colleges);
        }).catch(err=>{reject(err)})
    } )
}



exports.getCollegeById = (id)=>{                       
    return new promise( (resolve,reject) => {
        CONNECTION.connetDB().then(()=>{ return college.findById(id) }).then(colleges =>{
            CONNECTION.disConnetDB();
            resolve(colleges)
        }).catch(err=>{reject(err)})
    } )
}




exports.addNewCollege = (collegeData)=>{                 
    return new promise( (resolve,reject) => {
        CONNECTION.connetDB().then(()=>{
            let newCollege = new college(collegeData);  // Object from object constructor
            return newCollege.save();     //  =insert 
        }).then(colleges => {
            CONNECTION.disConnetDB();
            resolve(colleges);
        }).catch(err=> {
            CONNECTION.disConnetDB();
            reject(err)
        })
    } )
}