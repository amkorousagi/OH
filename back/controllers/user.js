// 유저 생성, 로그인, 자기 정보 보기
const userRouter = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")
const { json } = require("express")
const saltRounds = 10

userRouter.get("/", (req, res, next) => {
  try {
    return res.status(200).json({ success: true, user: req.user })
  } catch (err) {
    next(err)
  }
})
userRouter.get("/ranking", async (req, res, next) => {
  try {
    let users = await User.find({})
    users = users.map((u) => {
      let temp = {}
      temp.Score = u.SolvedProblem.length
      temp.Nickname = u.Nickname
      temp.StateMessage = u.StateMessage
      temp.NumOfSubmit = u.NumOfSubmit
      return temp
    })
    users = users.sort()
    console.log(users)
    return res.status(200).json({ success: true, users })
  } catch (err) {
    next(err)
  }
})
userRouter.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (user.Nickname)
      return res.status(200).json({ success: true, nickname: user.Nickname })
    else throw new Error("invalid user id")
  } catch (err) {
    next(err)
  }
})

userRouter.patch("/", async (req, res, next) => {
  try {
    const { UserPassword, Nickname, StateMessage } = req.body
    if (UserPassword === undefined && Nickname === undefined)
      throw new Error("plz fill password or nickname")

    let target = {}
    if (Nickname && Nickname != req.user.Nickname) {
      const dup = await User.find({ Nickname })
      console.log(dup.length)
      if (dup.length) throw new Error("duplicated nickname")
      target.Nickname = Nickname
    }
    if (UserPassword) {
      const result = await bcrypt.compare(UserPassword, req.user.UserPassword)
      if (result) throw new Error("same password with prior one")
      const hashedPassword = bcrypt.hash(UserPassword, saltRounds)
      target.UserPassword = hashedPassword
    }
    if(StateMessage){
      target.StateMessage = StateMessage
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, target, {
      new: true,
    })
    return res.status(200).json({ success: true, updatedUser })
  } catch (err) {
    next(err)
  }
})
userRouter.delete("/", async (req, res, next) => {
  try {
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
