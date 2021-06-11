const express = require('express')
const path = require('path')
const app = new express()
const ejs = require('ejs')
const axios = require('axios')


app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', function(req, res) {
    res.render('index')
})

const getProblems = async function() {
    try {
        return await axios.get("http://localhost:3001/problem", {headers: {Authorization :"bearer " + 
    `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMwNWQ2YmU2YzAxZjQwZTc3NzVjZTUiLCJVc2VySWQiOiJwc2MiLCJVc2VyUGFzc3dvcmQiOiIkMmIkMTAkRGdldTBReTRNall2MHZRV0xseVM2ZXRaMHlmWjhzcFlNdFVadFdocXc5elp1TE05a1ZMZkMiLCJOaWNrbmFtZSI6ImFta29ybyIsIlNvbHZlZFByb2JsZW0iOltdLCJfX3YiOjAsImlhdCI6MTYyMzIxOTgyMSwiZXhwIjoxNjIzNDc5MDIxfQ.WG9atLITTkZwbTf1RnmAWm31At_Y8-ezGU3zRnBo6lE`}});
    }catch(error) {
        console.error(error);
    }
}

const getRanks = async function() {
    try {
        return await axios.get("http://localhost:3001/user", {headers: {Authorization :"bearer " + 
    `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMwNWQ2YmU2YzAxZjQwZTc3NzVjZTUiLCJVc2VySWQiOiJwc2MiLCJVc2VyUGFzc3dvcmQiOiIkMmIkMTAkRGdldTBReTRNall2MHZRV0xseVM2ZXRaMHlmWjhzcFlNdFVadFdocXc5elp1TE05a1ZMZkMiLCJOaWNrbmFtZSI6ImFta29ybyIsIlNvbHZlZFByb2JsZW0iOltdLCJfX3YiOjAsImlhdCI6MTYyMzIxOTgyMSwiZXhwIjoxNjIzNDc5MDIxfQ.WG9atLITTkZwbTf1RnmAWm31At_Y8-ezGU3zRnBo6lE`}});
    }catch(error) {
        console.error(error);
    }
}

const getPosts = async function() {
    try {
        return await axios.get("http://localhost:3001/post", {headers: {Authorization :"bearer " + 
    `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMwNWQ2YmU2YzAxZjQwZTc3NzVjZTUiLCJVc2VySWQiOiJwc2MiLCJVc2VyUGFzc3dvcmQiOiIkMmIkMTAkRGdldTBReTRNall2MHZRV0xseVM2ZXRaMHlmWjhzcFlNdFVadFdocXc5elp1TE05a1ZMZkMiLCJOaWNrbmFtZSI6ImFta29ybyIsIlNvbHZlZFByb2JsZW0iOltdLCJfX3YiOjAsImlhdCI6MTYyMzIxOTgyMSwiZXhwIjoxNjIzNDc5MDIxfQ.WG9atLITTkZwbTf1RnmAWm31At_Y8-ezGU3zRnBo6lE`}});
    }catch(error) {
        console.error(error);
    }
}

app.get('/problem_list', async function(req, res) {
    const result = await getProblems();
    const data = result.data.problems;
    const problems = [];
    for(var i = 0; i < data.length; i++) {
        var obj = new Object({Title: data[i].Title, Difficulty: data[i].Difficulty, Keyword: data[i].Keyword, Correct: data[i].NumOfCorrect, Submit: data[i].NumOfSubmit});
        obj.Rate = obj.Submit ? obj.Submit/obj.Correct : 0;
        problems[i] = obj;
        //console.log(problems[i]);
    }
    res.render('problem_list', {problems});
})

app.get('/community_list', async function(req, res) {
    const result = await getPosts();
    const data = result.data.posts;
    const posts = [];
    for(var i = 0; i < data.length; i++) {
        var obj = new Object({Title: data[i].Title, Writer: data[i].Writer});
        posts[i] = obj;
    }
    console.log(posts.Title + posts.Writer);
    res.render('community_list', {posts})
})

app.get('/ranking', async function(req, res) {
    const result = await getRanks();
    users = result.data.user;
    //users.sort(function(a, b) {a.SolvedProblem.length - b.SolvedProblem.length;})
    console.log(users)
    res.render('ranking')
})

app.get('/about', function(req, res) {
    res.render('about')
})

app.get('/problem_submit', function(req, res) {
    res.render('problem_submit')
})

app.get('/community_submit', function(req, res) {
    res.render('community_submit')
})

app.get('/community_detail', function(req, res) {
    res.render('community_detail')
})

app.get('/problem_detail', function(req, res) {
    res.render('problem_detail')
})

app.get('/login', function(req, res) {
    res.render('login')
})

app.get('/register', function(req, res) {
    res.render('register')
})

app.listen(4000, function() {
    console.log('App listening on port 4000')
})