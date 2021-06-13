//댓글 작성 및 삭제
const commentNoAuthRouter = require("express").Router()
const Comment = require("../models/Comment")

commentNoAuthRouter.get("/", async (req, res, next) => {
  try {
    const { RefPost, ToComment, Writer } = req.query
    let target = {}
    if (RefPost) target.RefPost = RefPost
    if (ToComment) target.ToComment = ToComment
    if (Writer) target.Writer = Writer
    const comments = await Comment.find(target)
    return res.status(200).json({ success: true, comments })
  } catch (err) {
    next(err)
  }
})
commentNoAuthRouter.get("/:id", async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id)
    if (comment) return res.status(200).json({ success: true, comment })
    else throw new Error("invalid comment id")
  } catch (err) {
    next(err)
  }
})

module.exports = commentNoAuthRouter
