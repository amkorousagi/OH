const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    UserId : {type:String, required:true,unique:true},
    UserPassword : {type:String, required:true},
    Nickname : {type:String, required:true},
    SolvedProblem : [{ProblemId:String,Result:Boolean}]
})
module.exports = mongoose.model("User",UserSchema)