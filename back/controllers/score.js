//business logic
//score
const scoreRouter = require("express").Router()
const Score = require("../models/Score")

scoreRouter.get("/read", async (req, res, next) => {
  try {
    const { RefPost, ToComment, Writer } = req.query
    let target = {}
    if (RefPost) target.RefPost = RefPost
    if (ToComment) target.ToComment = ToComment
    if (Writer) target.Writer = Writer
    const comments = await Comment.find({ target })
    if (comments) return res.status(200).json({ success: true, comments })
  } catch (err) {
    next(err)
  }
})
scoreRouter.get("/read/:id", async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id)
    if (comment) return res.status(200).json({ success: true, comment })
    else throw new Error("invalid comment id")
  } catch (err) {
    next(err)
  }
})
scoreRouter.post("/create", async (req, res, next) => {
  try {
    //business logic
    const { Title, Body, RefPost, ToComment } = req.body
    if (RefPost === undefined) throw new Error("no ref post")
    if (Title === undefined || Body === undefined)
      throw Error("fill tile, body")
    let target = { Title, Body, RefPost }
    if (ToComment) target.ToComment = ToComment
    const Writer = req.user._id
    target.Writer = Writer
    const comment = new Comment(target)
    const savedComment = await comment.save()
    return res.status(200).json({ success: true, savedComment })
  } catch (err) {
    next(err)
  }
})
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

module.exports = scoreRouter
