const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    UserId : {type:String, required:true,unique:true},
    UserPassword : {type:String, required:true},
    Nickname : {type:String, required:true},
    Date : {type: Date},
    SolvedProblem : [{ProblemId:String,Result:Boolean}],
    StateMessage : String,
    NumOfSubmit : Number
})
module.exports = mongoose.model("User",UserSchema)