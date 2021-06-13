//problem 생성 및 삭제
const problemNoAuthRouter = require("express").Router()
const Problem = require("../models/Problem")

problemNoAuthRouter.get("/", async (req, res, next) => {
  try {
    const { Title, Writer, Difficulty, Keyword } = req.query
    let target = {}
    if (Title) target.Title = Title
    if (Writer) target.Writer = Writer
    if (Difficulty) target.Difficulty = Difficulty
    if (Keyword) target.Keyword = Keyword
    const problems = await Problem.find(target)
    return res.status(200).json({ success: true, problems })
  } catch (err) {
    next(err)
  }
})
problemNoAuthRouter.get("/:id", async (req, res, next) => {
  try {
    const problem = await Problem.findById(req.params.id)
    if (problem) return res.status(200).json({ success: true, problem })
    else throw new Error("invalid problem id")
  } catch (err) {
    next(err)
  }
})


module.exports = problemNoAuthRouter
