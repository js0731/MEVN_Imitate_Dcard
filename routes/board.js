const express = require('express');
const router = express.Router();
const Article = require('../models/Article')


router.get('/all/:number', (req, res) => {
    console.log(req.params.number);
    // Article.find({})
    //     .sort({ love: -1 })
    //     .skip(Number(req.params.number))
    //     .limit(Number(10))

    //     .then(articleData => {
    //         res.json({ articleData: articleData })
    // //     })
    // Article.find({})
    //     .sort({ love: -1 })
    //     .then(articleData => {
    //         articleData.forEach(e => {
    //             console.log(e.title);
    //         })
    //     })
    Article.find({})
        .sort({ love: -1, _id: 1 })
        .limit(Number(10))
        .skip(Number(req.params.number) + 1)
        .then(articleData => {
            articleData.forEach(e => {
                console.log(e.title);
            })
            res.json({ articleData: articleData })
        })
})

router.get('/all/latest/:number', (req, res) => {
    Article.find({})
        .skip(Number(req.params.number))
        .limit(Number(10))
        .then(articleData => {

            res.json({ articleData: articleData })
        })
})

router.get('/:board/:number', (req, res) => {

    Article.find({ boardPath: req.params.board })
        .sort({ love: -1, _id: 1 })
        .skip(Number(req.params.number))
        .limit(Number(10))
        .then(articleData => {

            res.json({ articleData: articleData })
        })
})

router.get('/:board/latest/:number', (req, res) => {
    Article.find({ boardPath: req.params.board })
        .skip(Number(req.params.number))
        .limit(Number(10))
        .then(articleData => {
            res.json({ articleData: articleData })
        })
})



router.get('/:board/article/:id', (req, res) => {
    Article.find({ boardPath: req.params.board, _id: req.params.id }, (err, article) => {
        res.json(...article)
    })
})






module.exports = router