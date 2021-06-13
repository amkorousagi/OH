//글작성 및 삭제
const postNoAuthRouter = require("express").Router()
const Post = require("../models/Post")

postNoAuthRouter.get("/", async (req, res, next) => {
  try {
    const { Title, Writer } = req.query
    let target = {}
    if (Title) target.Title = Title
    if (Writer) target.Writer = Writer
    const posts = await Post.find(target)
    return res.status(200).json({ success: true, posts })
  } catch (err) {
    next(err)
  }
})
postNoAuthRouter.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { NumOfView: 1 } },
      { new: true }
    )
    if (post) return res.status(200).json({ success: true, post })
    else throw new Error("invalid post id")
  } catch (err) {
    next(err)
  }
})


module.exports = postNoAuthRouter
