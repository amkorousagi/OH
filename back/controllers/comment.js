//댓글 작성 및 삭제
const commentRouter = require("express").Router()
const Comment = require("../models/Comment")

commentRouter.post("/", async (req, res, next) => {
  try {
    const { Title, Body, RefPost, ToComment } = req.body
    if (RefPost === undefined) throw new Error("no ref post")
    if (Title === undefined || Body === undefined)
      throw Error("fill tile, body")
    let target = { Title, Body, RefPost }
    if (ToComment) target.ToComment = ToComment
    const Writer = req.user._id
    target.Writer = Writer
    const comment = new Comment({ ...target, Date: new Date() })
    const savedComment = await comment.save()
    return res.status(200).json({ success: true, savedComment })
  } catch (err) {
    next(err)
  }
})
commentRouter.patch("/:id", async (req, res, next) => {
  try {
    const origin = await Comment.findById(req.params.id)
    if (!origin) throw new Error("invalid comment id")
    if (req.user._id.toString() !== origin.Writer.toString())
      throw new Error("not writer")

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
commentRouter.delete("/:id", async (req, res, next) => {
  try {
    const origin = await Comment.findById(req.params.id)
    if (!origin) throw new Error("invalid comment id")
    if (req.user._id.toString() !== origin.Writer.toString())
      throw new Error("not writer")

    const deletedComment = await Comment.findByIdAndDelete(req.params.id)
    if (!deletedComment) throw new Error("can not delete no comment")
    return res.status(200).json({ success: true, deletedComment })
  } catch (err) {
    next(err)
  }
})

module.exports = commentRouter
