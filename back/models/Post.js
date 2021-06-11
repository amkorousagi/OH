const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    Title : {type : String, required:true},
    Body : {type:String, required:true},
    NumOfView : {type : Number, default:0},
    Date : {type: Date},
    Writer: {type:mongoose.Schema.Types.ObjectId, ref:"User"}
})

module.exports = mongoose.model("Post",PostSchema)