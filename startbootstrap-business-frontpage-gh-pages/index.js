const express = require('express')
const path = require('path')
const app = new express()
const ejs = require('ejs')
app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', function(req, res) {
    res.render('index')
})

app.get('/problem_list', function(req, res) {
    res.render('problem_list')
})

app.get('/community_list', function(req, res) {
    res.render('community_list')
})

app.get('/ranking', function(req, res) {
    res.render('ranking')
})

app.get('/about', function(req, res) {
    res.render('about')
})

app.get('/problem_submit', function(req, res) {
    res.render('problem_submit')
})

app.listen(4000, function() {
    console.log('App listening on port 4000')
})