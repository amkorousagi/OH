const mongoose = require("mongoose")

const ScoreSchema = new mongoose.Schema({
    Result : {type:String, required:true},
    Feedback : {type:String},
    Code : {type:String},
    ProblemTitle : String,
    RefProblem : {type:mongoose.Schema.Types.ObjectId,ref:"Problem", required:true},
    Date : {type: Date},
    RefUser : {type:mongoose.Schema.Types.ObjectId,ref:"User", required:true}
})

module.exports = mongoose.model("Score",ScoreSchema)