const mongoose = require("mongoose")

const ProblemSchema = new mongoose.Schema({
  Title: { type: String, required:true },
  Description: { type: String, required: true },
  TestCase: {type:[{ Input: String, Output: String }], required: true},
  Writer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  Difficulty : {type:String},
  Keyword : {type:[String]},
  NumOfCorrect: Number,
  NumOfSubmit: Number,
})

module.exports = mongoose.model("Problem",ProblemSchema)