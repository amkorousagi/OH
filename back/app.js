// all models' CRUD
// generate from Problem + Code -> Score : business logic

// import library
const cors = require("cors")
const express = require("express")
const app = express()
const config = require("./utils/config")
const mongoose = require("mongoose")
const logger = require("./utils/logger")
const middleware = require("./utils/middleware")

//import router
const userNoAuthRouter = require("./controllers/user_no_auth")
const userRouter = require("./controllers/user")
const postRouter = require("./controllers/post")
const problemRouter = require("./controllers/problem")
const commentRouter = require("./controllers/comment")
const scoreRouter = require("./controllers/score")

//db connect
mongoose
  .connect(config.databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((data) => {
    logger.info("connected to MongoDB ")
  })
  .catch((err) => {
    logger.err("error connecting to MongoDB: ", err)
  })

//use routes
app.use(cors()) // for preventing cross origin error
app.use(express.json()) // for parsing req.body
app.use((req,res,next)=>{
  console.log("req. body : ",req.body)
})
app.use("/user_no_auth", userNoAuthRouter)

//for auth
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)

app.use("/user", userRouter)
app.use("/post", postRouter)
app.use("/problem", problemRouter)
app.use("/comment", commentRouter)
app.use("/score", scoreRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandling) // register error handing middleware

app.listen(config.port, "0.0.0.0", () => {
  console.log("OH! backend server listening on port ", config.port)
})

/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMwNWQ2YmU2YzAxZjQwZTc3NzVjZTUiLCJVc2VySWQiOiJwc2MiLCJVc2VyUGFzc3dvcmQiOiIkMmIkMTAkRGdldTBReTRNall2MHZRV0xseVM2ZXRaMHlmWjhzcFlNdFVadFdocXc5elp1TE05a1ZMZkMiLCJOaWNrbmFtZSI6ImFta29ybyIsIlNvbHZlZFByb2JsZW0iOltdLCJfX3YiOjAsImlhdCI6MTYyMzIxOTgyMSwiZXhwIjoxNjIzNDc5MDIxfQ.WG9atLITTkZwbTf1RnmAWm31At_Y8-ezGU3zRnBo6lE
*/