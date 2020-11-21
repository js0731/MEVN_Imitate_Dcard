const express = require('express');
const router = express.Router();
const User = require('../models/User')
const Article = require('../models/Article')


router.get('/:board', (req, res) => {
    Article.find({ boardPath: req.params.board }, (err, articleData) => {
        res.json({ articleData: articleData })
    })

})

router.get('/:board/:id', (req, res) => {
    Article.find({ boardPath: req.params.board, _id: req.params.id }, (err, article) => {

        res.json({ article: article })
    })
})


module.exports = router