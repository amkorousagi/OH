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
      req.token = ""
      next()
    }
  } catch (err) {
    next(err)
  }
}

const userExtractor = async (req, res, next) => {
  try {
    if (req.token == "") next()
    const decodedToken = await jwt.verify(req.token, config.secret)
    if (!req.token || !decodedToken) throw new Error("no token")
    const user = await User.findById(decodedToken._id)
    req.user = user
    next()
  } catch (err) {
    next(err)
  }
}

const errorHandling = (err, req, res, next) => {
  console.log("im error log")
  console.err(err)
  return res.status(500).end({ success: false })
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ success:false, error: "unknown endpoint" })
}
module.exports = {
  tokenExtractor,
  userExtractor,
  errorHandling,
  unknownEndpoint,
}
