const express = require('express')
const path = require('path')
const app = new express()
const ejs = require('ejs')
app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/problem_list', function(req, res) {
    res.render('problem_list')
})

app.listen(4000, function() {
    console.log('App listening on port 4000')
})