const express = require('express');
const router = express.Router();
const User = require('../models/User')
const Article = require('../models/Article')
const passport = require('passport');

router.get('/all/:number', (req, res) => {
    console.log(req.params);
    Article.find({})
        .sort({ love: -1 })
        .skip(Number(req.params.number))
        .limit(Number(10))
        .then(articleData => {
            console.log(articleData);
            res.json({ articleData: articleData })
        })
})

router.get('/all/latest/:number', (req, res) => {
    console.log(req.params);
    Article.find({})
        .skip(Number(req.params.number))
        .limit(Number(10))
        .then(articleData => {
            console.log(articleData);
            res.json({ articleData: articleData })
        })
})

router.get('/:board/:number', (req, res) => {
    console.log(req.params);
    Article.find({ boardPath: req.params.board })
        .sort({ love: -1 })
        .skip(Number(req.params.number))
        .limit(Number(10))
        .then(articleData => {
            console.log(articleData);
            res.json({ articleData: articleData })
        })
})

router.get('/:board/latest/:number', (req, res) => {
    console.log(req.params);
    Article.find({ boardPath: req.params.board })
        .skip(Number(req.params.number))
        .limit(Number(10))
        .then(articleData => {
            console.log(articleData);
            res.json({ articleData: articleData })
        })
})



router.get('/:board/article/:id', (req, res) => {
    console.log(req.params);
    Article.find({ boardPath: req.params.board, _id: req.params.id }, (err, article) => {
        res.json(...article)
    })
})






module.exports = router