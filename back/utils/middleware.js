//토큰 추출

const jwt = require("jsonwebtoken")
const config = require("./config")
const User = require("../models/User")

//에러 후 처리.. res.status ..
const tokenExtractor = (req, res, next) => {
  try {
    const authorization = req.get("authorization")
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
      req.token = authorization.substring(7)
      next()
    } else {
      throw new Error("invalid token")
    }
  } catch (err) {
    next(err)
  }
}

const userExtractor = async (req, res, next) => {
  try {
    const decodedToken = await jwt.verify(req.token, config.secret)
    if (!req.token || !decodedToken) throw new Error("no token")
    const user = await User.findById(decodedToken.id)
    req.user = user
    next()
  } catch (err) {
    next(err)
  }
}

const errorHandling = (err, req, res, next) => {
  console.err(err)
  res.status(500).json({ success: false, err })
}

module.exports = { tokenExtractor, userExtractor, errorHandling }
