const userNoAuthRouter = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const config = require("../utils/config")
const saltRounds = 10

userNoAuthRouter.post("/login", async (req, res, next) => {
  try {
    const { UserId, UserPassword } = req.body
    const user = await User.findOne({ UserId })
    if (user) {
      const result = await bcrypt.compare(UserPassword, user.UserPassword)
      if (result) {
        const token = jwt.sign(user, config.secret, {
          expiresIn: 60 * 60 * 24 * 3,
        })
        return res.status(200).json({ success: true, token })
      } else {
        throw new Error("invalid password")
      }
    } else {
      throw new Error("invalid id")
    }
  } catch (err) {
    next(err)
  }
})
userNoAuthRouter.post("/join", async (req, res, next) => {
  try {
    const { UserId, UserPassword, Nickname } = req.body
    if (UserId === undefined || UserPassword === undefined || Nickname ===undefined)
      throw new Error("plz fill Id, Password, Nickname")

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
module.exports = userNoAuthRouter