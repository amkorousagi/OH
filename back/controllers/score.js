//business logic
//score
const scoreRouter = require("express").Router()
const Score = require("../models/Score")
const Problem = require("../models/Problem")
const fs = require("fs")
const util = require("util")
const { PythonShell } = require("python-shell")

const writeFile = util.promisify(fs.writeFile)
scoreRouter.get("/", async (req, res, next) => {
  try {
    const { Result, RefProblem, RefUser } = req.query
    let target = {}
    if (Result) target.Result = Result
    if (RefProblem) target.RefProblem = RefProblem
    if (RefUser) target.RefUser = RefUser
    const scores = await Score.find(target)
    return res.status(200).json({ success: true, scores })
  } catch (err) {
    next(err)
  }
})
scoreRouter.get("/:id", async (req, res, next) => {
  try {
    const score = await Score.findById(req.params.id)
    if (score) return res.status(200).json({ success: true, score })
    else throw new Error("invalid score id")
  } catch (err) {
    next(err)
  }
})
scoreRouter.post("/", async (req, res, next) => {
  try {
    const { Code, RefProblem } = req.body
    const RefUser = req.user._id
    if (RefProblem === undefined || Code === undefined)
      throw new Error("no ref post or code")
    let target = { Code, RefProblem, RefUser }

    const problem = await Problem.findByIdAndUpdate(RefProblem, {
      $inc: { NumOfSubmit: 1 },
    })
    if (!problem) throw new Error("invalid problem ref")

    const score = new Score({ ...target, Result: "waiting" })
    const tempScore = await score.save()

    //business logic
    let my_result = true
    let Result
    //judge code

    //fs : code -> file
    await writeFile("./resource/code/" + tempScore._id + ".py", Code)

    for (let i = 0; i < problem.TestCase.length; i++) {
      let pyshell = new PythonShell("./resource/code/" + tempScore._id + ".py")
      pyshell.send(problem.TestCase[i].Input)
      const my_message = await new Promise((resolve, reject) => {
        pyshell.on("message", (message) => {
          resolve(message)
        })
      })
      pyshell.end((err, code, signal) => {
        if (err) console.log(err)
      })
      console.log(my_message)
      console.log(problem.TestCase[i].Input)
      if (my_message != problem.TestCase[i].Input) {
        my_result = false
        Result = "failed"
        break
      }
    }
    if (my_result) {
      Result = "successed"
      await Problem.findByIdAndUpdate(RefProblem, {
        $inc: { NumOfCorrect: 1 },
      })
    }

    const finalScore = await Score.findByIdAndUpdate(
      tempScore._id,
      { Result },
      { new: true }
    )

    return res.status(200).json({ success: true, score: finalScore })
    //fs : problem -> input, output file
    //jsshell : execute file with input file and compare wuth output file
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
