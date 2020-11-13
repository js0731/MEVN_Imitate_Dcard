const express = require('express');
const router = express.Router();
const Article = require('../models/Article')


router.get('/:board', (req, res) => {
    console.log(this.params);
    Article.find({ selectedBoard: '前端工程師' }, (err, boardData) => {

        res.json({
            boardName: '前端工程師',
            boardData
        })
    })
});

router.get('/frontend', (req, res) => {
    Article.find({ selectedBoard: '前端工程師' }, (err, boardData) => {

        res.json({
            boardName: '前端工程師',
            boardData
        })
    })
});
// router.get('/:board/:id', (req, res) => {
//     console.log(req.params.id, req.params);
//     Article.findById({ _id: req.params.id }, (err, data) => {
//         console.log(data);
//         res.json('123')
//     })

// })
router.get('/dressup', (req, res) => {
    Article.find({ selectedBoard: '穿搭板' }, (err, boardData) => {
        res.json({
            boardName: '穿搭板',
            boardData
        })
    })
});

router.get('/funny', (req, res) => {
    Article.find({ selectedBoard: '有趣板' }, (err, boardData) => {
        res.json({
            boardName: '有趣板',
            boardData
        })
    })
});


module.exports = router