const express = require('express');
const app = express();

const mongoose = require('mongoose');
require('dotenv').config()
const bodyParser = require('body-parser')
const passport = require('passport');
const cors = require('cors');

const user = require('./routes/user');
const board = require('./routes/board');


app.use(
    cors({
        origin: ['https://js0731.github.io', 'http://localhost:8080/'],
        methods: ['GET', 'POST'],
        credentials: true,
    })
);

mongoose.connect(process.env.MONGODBURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Mongodb Connected'))
    .catch(err => console.log(err))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use(passport.initialize())
// (passport)等同於在/porject/passport.js 引入上方的passport模組
require('./passport')(passport)


app.use('/user', user);
app.use('/board', board);



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})