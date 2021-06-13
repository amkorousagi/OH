const express = require("express")
const path = require("path")
const app = new express()
const ejs = require("ejs")
const axios = require("axios")
const cookieParser = require("cookie-parser")

app.set("view engine", "ejs")
app.use(cookieParser())
app.use(express.static("public"))

app.get("/", async function (req, res) {
  const result_problem = await axios.get("http://localhost:3001/problem", {
  headers: { Authorization: "bearer " + req.cookies.token },
  })
  const problems = result_problem.data.problems
  const NumOfProblems = problems.length < 10 ? problems.length : 10;
  const result_post = await axios.get("http://localhost:3001/post", {
    headers: { Authorization: "bearer " + req.cookies.token },
  })
  const posts = result_post.data.posts
  const NumOfPosts = posts.length < 10 ? posts.length : 10;
  const result_user = await axios.get("http://localhost:3001/user/ranking", {
    headers: { Authorization: "bearer " + req.cookies.token },
  })
  const users = result_user.data.users
  users.sort(function(a, b) { return b.Score - a.Score})
  const NumOfUsers = users.length < 10 ? users.length : 10;
  const num = [NumOfProblems, NumOfPosts, NumOfUsers]
  res.render("index", {problems, posts, users, num})
})

app.get("/problem_submit", async function (req, res) {
  res.render("problem_submit")
})
app.get("/problem_list", async function (req, res) {
  console.log(req.cookies.token)
  const result = await axios.get("http://localhost:3001/problem", {
    headers: { Authorization: "bearer " + req.cookies.token },
  })
  const problems = result.data.problems
  for (var i = 0; i < problems.length; i++) {
    problems[i].Rate = problems.NumOfSubmit
      ? problems.NumOfSubmit / problems.NumOfCorrect
      : 0
  }
  // console.log(problems);
  res.render("problem_list", { problems })
})
app.get("/problem_detail/:id", async function (req, res) {
  console.log(req.params.id)
  const result = await axios.get(
    "http://localhost:3001/problem/" + req.params.id,
    { headers: { Authorization: "bearer " + req.cookies.token } }
  )
  const data = result.data.problem
  console.log("detail " + JSON.stringify(data))
  res.render("problem_detail", { data, pro_id:req.params.id })
})

app.get("/community_list", async function (req, res) {
  const result = await axios.get("http://localhost:3001/post", {
    headers: { Authorization: "bearer " + req.cookies.token },
  })
  let posts = result.data.posts
  console.log(posts)
  res.render("community_list", { posts })
})
app.get("/community_submit", async function (req, res) {
  res.render("community_submit")
})

app.get("/community_detail/:id", async function (req, res) {
  console.log(req.params.id)
  const result = await axios.get(
    "http://localhost:3001/post/" + req.params.id,
    { headers: { Authorization: "bearer " + req.cookies.token } }
  )
  const data = result.data.post
  console.log(data)
  res.render("community_detail", { data })
})

app.get("/ranking", async function (req, res) {
  console.log("rangking")
  const result = await axios.get("http://localhost:3001/user/ranking", {
    headers: { Authorization: "bearer " + req.cookies.token },
  })
  users = result.data.users
  users.sort(function(a, b) { return b.Score - a.Score})
  res.render("ranking", { users })
})

app.get("/about", function (req, res) {
  res.render("about")
})

app.get("/login", function (req, res) {
  res.render("login")
})

app.get("/register", function (req, res) {
  res.render("register")
})

app.get("/mypage", async function (req, res) {
  console.log("mypage")
  const result = await axios.get(
    "http://localhost:3001/user", {
    headers: { Authorization: "bearer " + req.cookies.token } }
  )
  const data = result.data.user
  console.log("detail " + JSON.stringify(data))
  res.render("mypage", { data })
})

//app.post()

app.listen(4000, function () {
  console.log("App listening on port 4000")
})
