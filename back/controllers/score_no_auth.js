//business logic
//score
const scoreNoAuthRouter = require("express").Router()
const Score = require("../models/Score")
const Problem = require("../models/Problem")
const User = require("../models/User")
const fs = require("fs")
const util = require("util")
scoreNoAuthRouter.get("/", async (req, res, next) => {
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
scoreNoAuthRouter.get("/:id", async (req, res, next) => {
  try {
    const score = await Score.findById(req.params.id)
    if (score) return res.status(200).json({ success: true, score })
    else throw new Error("invalid score id")
  } catch (err) {
    next(err)
  }
})

module.exports = scoreNoAuthRouter
