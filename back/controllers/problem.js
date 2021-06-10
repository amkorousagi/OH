//problem 생성 및 삭제
const problemRouter = require("express").Router()
const Problem = require("../models/Problem")

problemRouter.get("/", async (req, res, next) => {
  try {
    const { Title, Writer } = req.query
    let target = {}
    if (Title) target.Title = Title
    if (Writer) target.Writer = Writer
    const problems = await Problem.find(target)
    return res.status(200).json({ success: true, problems })
  } catch (err) {
    next(err)
  }
})
problemRouter.get("/:id", async (req, res, next) => {
  try {
    const problem = await Problem.findById(req.params.id)
    if (problem) return res.status(200).json({ success: true, problem })
    else throw new Error("invalid problem id")
  } catch (err) {
    next(err)
  }
})
problemRouter.post("/", async (req, res, next) => {
  try {
    const { Title, Description, TestCase } = req.body
    if (
      Title === undefined ||
      Description === undefined ||
      TestCase === undefined
    )
      throw new Error("fill problem property")
    const Writer = req.user._id,
      NumOfCorrect = 0,
      NumOfSubmit = 0
    const problem = new Problem({
      Title,
      Description,
      TestCase,
      Writer,
      NumOfCorrect,
      NumOfSubmit,
    })
    const savedProblem = await problem.save()
 
    return res.status(200).json({ success: true, savedProblem })
  } catch (err) {
    next(err)
  }
})
problemRouter.patch("/:id", async (req, res, next) => {
  try {
    const origin = await Problem.findById(req.params.id)

    if (!origin) throw new Error("invalid problem id")
    if (req.user._id.toString() != origin.Writer.toString())
      throw new Error("not writer")

    const { Title, Description, TestCase } = req.body
    if (
      Title === undefined &&
      Description === undefined &&
      TestCase === undefined
    )
      throw new Error("plz fill at least one")
    let target = {}
    if (Title) {
      target.Title = Title
    }
    if (Description) {
      target.Description = Description
    }
    if (TestCase) {
      target.TestCase = TestCase
    }
    const updatedProblem = await Problem.findByIdAndUpdate(
      req.params.id,
      target,
      { new: true }
    )
    if (!updatedProblem) throw new Error("invalid problem id when updating")

    return res.status(200).json({ success: true, updatedProblem })
  } catch (err) {
    next(err)
  }
})
problemRouter.delete("/:id", async (req, res, next) => {
  try {
    const origin = await Problem.findById(req.params.id)
    if (!origin) throw new Error("invalid problem id")
    if (req.user._id.toString() !== origin.Writer.toString())
      throw new Error("not writer")

    const deletedProblem = await Problem.findByIdAndDelete(req.params.id)
    if (!deletedProblem) throw new Error("can not delete no problem")
    return res.status(200).json({ success: true, deletedProblem })
  } catch (err) {
    next(err)
  }
})

module.exports = problemRouter
