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

const getUserNickname = async function() {
    try {
        const result = await axios.get("http://localhost:3001/user/:id", {headers: {Authorization :"bearer " + 
    `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMwNWQ2YmU2YzAxZjQwZTc3NzVjZTUiLCJVc2VySWQiOiJwc2MiLCJVc2VyUGFzc3dvcmQiOiIkMmIkMTAkRGdldTBReTRNall2MHZRV0xseVM2ZXRaMHlmWjhzcFlNdFVadFdocXc5elp1TE05a1ZMZkMiLCJOaWNrbmFtZSI6ImFta29ybyIsIlNvbHZlZFByb2JsZW0iOltdLCJfX3YiOjAsImlhdCI6MTYyMzIxOTgyMSwiZXhwIjoxNjIzNDc5MDIxfQ.WG9atLITTkZwbTf1RnmAWm31At_Y8-ezGU3zRnBo6lE`}});
    }catch(error) {
        console.error(error);
    }
    console.log(result);
}

app.get('/problem_list', async function(req, res) {
    const result = await getProblems();
    const problems = result.data.problems;
    res.render('problem_list', {problems});
})

app.get('/community_list', async function(req, res) {
    const result = await getPosts();
    const posts = result.data.posts;
    getUserNickname();
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