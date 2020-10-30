const express = require('express');
const { db } = require('../models/Article');
const router = express.Router();
const Article = require('../models/Article');

router.get('/', (req, res) => {
    db.all_data.find({ "board": "穿搭板" })
        .then(user => {
            res.json(user);
        })
});

module.exports = router