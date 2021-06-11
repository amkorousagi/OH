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
    `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMzNTNmYjhmNWM4YzMyMGE5MmUxNmMiLCJVc2VySWQiOiJwc2MiLCJVc2VyUGFzc3dvcmQiOiIkMmIkMTAkZ3dlb1FZRmZleWsxZXpsQ3VjMHZ6dVgubUtVSjJObkozZ3dyN1VLTkpxSnhKTnp2M1VtUzIiLCJOaWNrbmFtZSI6Im15bmlja25hbWUiLCJEYXRlIjoiMjAyMS0wNi0xMVQxMjoxNTo1NS41NzhaIiwiU29sdmVkUHJvYmxlbSI6W10sIl9fdiI6MCwiaWF0IjoxNjIzNDEzNzY3LCJleHAiOjE2MjM2NzI5Njd9.itQzum8hiqma7K3liyiyuwjZ4Q3owGkQldlBx1WQzm4`}});
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
    `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMzNTNmYjhmNWM4YzMyMGE5MmUxNmMiLCJVc2VySWQiOiJwc2MiLCJVc2VyUGFzc3dvcmQiOiIkMmIkMTAkZ3dlb1FZRmZleWsxZXpsQ3VjMHZ6dVgubUtVSjJObkozZ3dyN1VLTkpxSnhKTnp2M1VtUzIiLCJOaWNrbmFtZSI6Im15bmlja25hbWUiLCJEYXRlIjoiMjAyMS0wNi0xMVQxMjoxNTo1NS41NzhaIiwiU29sdmVkUHJvYmxlbSI6W10sIl9fdiI6MCwiaWF0IjoxNjIzNDEzNzY3LCJleHAiOjE2MjM2NzI5Njd9.itQzum8hiqma7K3liyiyuwjZ4Q3owGkQldlBx1WQzm4`}});
    }catch(error) {
        console.error(error);
    }
}

const getUserNickname = async function() {
    try {
        return await axios.get("http://localhost:3001/user/:id", {headers: {Authorization :"bearer " + 
    `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMzNTNmYjhmNWM4YzMyMGE5MmUxNmMiLCJVc2VySWQiOiJwc2MiLCJVc2VyUGFzc3dvcmQiOiIkMmIkMTAkZ3dlb1FZRmZleWsxZXpsQ3VjMHZ6dVgubUtVSjJObkozZ3dyN1VLTkpxSnhKTnp2M1VtUzIiLCJOaWNrbmFtZSI6Im15bmlja25hbWUiLCJEYXRlIjoiMjAyMS0wNi0xMVQxMjoxNTo1NS41NzhaIiwiU29sdmVkUHJvYmxlbSI6W10sIl9fdiI6MCwiaWF0IjoxNjIzNDEzNzY3LCJleHAiOjE2MjM2NzI5Njd9.itQzum8hiqma7K3liyiyuwjZ4Q3owGkQldlBx1WQzm4`}});
    }catch(error) {
        console.error(error);
    }
}

app.get('/problem_list', async function(req, res) {
    const result = await getProblems();
    const problems = result.data.problems;
    for(var i = 0; i < problems.length; i++) {
        problems[i].Rate = problems.NumOfSubmit ? problems.NumOfSubmit / problems.NumOfCorrect : 0;
    }
    // console.log(problems);
    res.render('problem_list', {problems});
})
app.get('/problem_detail', async function(req, res) {
    const result = await getProblems();
    const data = result.data.problems;
    res.render('problem_detail', {data});
})

app.get('/community_list', async function(req, res) {
    const result = await getPosts();
    const posts = result.data.posts;
    // const result1 = getUserNickname();
    // console.log(result1.data);
    // console.log(posts[0].Date.substring(0, 10));
    res.render('community_list', {posts})
})

app.get('/ranking', async function(req, res) {
    const result = await getRanks();
    users = result;
    console.log(users);
    //users.sort(function(a, b) {a.SolvedProblem.length - b.SolvedProblem.length;})
    res.render('ranking')
})

app.get('/about', function(req, res) {
    res.render('about')
})

app.get('/problem_submit', async function(req, res) {
    const result = await getProblems();
    const data = result.data.problems;
    res.render('problem_submit',{data})
})

app.get('/community_submit', async function(req, res) {
    const result = await getPosts();
    const data = result.data.post;
    res.render('community_submit',{data})
})

app.get('/community_detail', async function(req, res) {
    const result = await getPosts();
    const data = result.data.post;
    res.render('community_detail', {data});

})

app.get('/problem_detail', async function(req, res) {
    const result = await getProblems();
    const data = result.data.prolems;
    res.render('problem_detail', {data})
})

app.get('/login', function(req, res) {
    res.render('login')
})

app.get('/register', function(req, res) {
    res.render('register')
})

//app.post()

app.listen(4000, function() {
    console.log('App listening on port 4000')
})