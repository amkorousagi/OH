// 유저 생성, 로그인, 자기 정보 보기
const userRouter = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")
const saltRounds = 10

userRouter.post("/login", async (req, res) => {})
userRouter.post("/join", async (req, res, next) => {
  try {
    const { UserId, UserPassword, Nickname } = req.body
    if (UserId === undefined || UserPassword === undefined)
      throw new Error("plz fill Id, Password")

    const dup1 = await User.find({ UserId })
    const dup2 = await User.find({ Nickname })
    if (dup1 | dup2) throw new Error("duplicated id or nickname")

    const hashedPassword = bcrypt.hash(UserPassword, saltRounds)
    const user = new User({ ...req.body, UserPassword: hashedPassword })
    const savedUser = await user.save()
    return res.status(201).json({ success: true, savedUser })
  } catch (err) {
    next(err)
  }
})
userRouter.get("/read", (req, res) => {
  if (req.user) {
    return res.status(200).json({ success: true, user: req.user })
  } else {
    return res.status(400).json({ success: false, message: "no user" })
  }
})
userRouter.post("/update", async (req, res, next) => {
  try {
    if (!req.user)
      return res.status(400).json({ success: false, message: "no user" })

    const { UserPassword, Nickname } = req.body
    if (UserPassword === undefined || Nickname === undefined)
      throw new Error("plz fill password or nickname")

    if (Nickname) {
      const dup = await User.find({ Nickname })
      if (dup) throw new Error("duplicated nickname")
    }
    if (UserPassword) {
      const result = await bcrypt.compare(UserPassword, req.user.UserPassword)
      if (result) throw new Error("same password with prior one")
    }

    const target =
      UserPassword && Nickname
        ? { UserPassword, Nickname }
        : UserPassword === undefined
        ? { Nickname }
        : { UserPassword }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, target, {
      new: true,
    })
    return res.status(200).json({ success: true, updatedUser })
  } catch (err) {
    next(err)
  }
})
userRouter.delete("/delete", async (req, res, next) => {
  try {
    if (!req.user)
      return res.status(400).json({ success: false, message: "no user" })

    const deletedUser = await User.findByIdAndDelete(req.user._id)
    if (!deletedUser) {
      throw new Error("can not delete no user")
    }
    return res.status(200).json({ success: true, deletedUser })
  } catch (err) {
    next(err)
  }
})

module.exports = userRouter
