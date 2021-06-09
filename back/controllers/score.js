//business logic
//score
const scoreRouter = require("express").Router()
const Score = require("../models/Score")
const Problem = require("../models/Problem")
const User = require("../models/User")

scoreRouter.get("/read", async (req, res, next) => {
  try {
    const { Result, RefProblem, RefUser } = req.query
    let target = {}
    if (Result) target.Result = Result
    if (RefProblem) target.RefProblem = RefProblem
    if (RefUser) target.RefUser = RefUser
    const scores = await Score.find({ target })
    return res.status(200).json({ success: true, scores })
  } catch (err) {
    next(err)
  }
})
scoreRouter.get("/read/:id", async (req, res, next) => {
  try {
    const score = await Score.findById(req.params.id)
    if (score) return res.status(200).json({ success: true, score })
    else throw new Error("invalid score id")
  } catch (err) {
    next(err)
  }
})
scoreRouter.post("/create", async (req, res, next) => {
  try {
    const { Code, RefProblem } = req.body
    const RefUser = req.user._id
    if (RefProblem === undefined || Code === undefined) throw new Error("no ref post or code")
    let target = { Code, RefProblem, RefUser }

    const problem = await Problem.findById(RefProblem)
    if(!problem) throw new Error("invalid problem ref")

    //business logic
    let Result, Feedback
    //judge code

    if(Result){
        Feedback = ""
        req.user.SolvedProblem
    }
    else{
        //fill feedback (error message)
    }
    

    const score = new Score(target)
    const savedScore = await score.save()
    return res.status(200).json({ success: true, savedScore })
  } catch (err) {
    next(err)
  }
})
//score cannot update or delete
/*
scoreRouter.post("/update/:id", async (req, res, next) => {
  try {
    const origin = await Comment.findById(req.params.id)
    if (!origin) throw new Error("invalid comment id")
    if (req.user._id !== origin.Writer) throw new Error("not writer")

    const { Title, Body } = req.body
    if (Title === undefined && Body === undefined)
      throw new Error("plz fill at least one")
    let target = {}
    if (Title) target.Title = Title
    if (Body) target.Body = Body

    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      target,
      { new: true }
    )
    if (!updatedComment) throw new Error("invalid comment id when updating")
    return res.status(200).json({ success: true, updatedComment })
  } catch (err) {
    next(err)
  }
})
scoreRouter.delete("/delete/:id", async (req, res, next) => {
  try {
    const origin = await Comment.findById(req.params.id)
    if (!origin) throw new Error("invalid comment id")
    if (req.user._id !== origin.Writer) throw new Error("not writer")

    const deletedComment = await Comment.findByIdAndDelete(req.params.id)
    if (!deletedComment) throw new Error("can not delete no comment")
    return res.status(200).json({ success: true, deletedComment })
  } catch (err) {
    next(err)
  }
})
*/
module.exports = scoreRouter
