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

//db connect
mongoose
  .connect(config.databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((data) => {
    logger.info("connected to MongoDB ", data)
  })
  .catch((err) => {
    logger.err("error connecting to MongoDB: ", err)
  })

//use routes
app.use(cors()) // for preventing cross origin error
app.use(express.json()) // for parsing req.body

app.listen(port, "0.0.0.0", () => {
  console.log("OH! backend server listening on port ", port)
})
