const express = require('express');
const app = express();

const mongoose = require('mongoose');
require('dotenv').config()

const user = require('./routes/user');
const api = require('./routes/api');


app.use('/user', user);
app.use('/api', api);

mongoose.connect(process.env.MONGODBURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Mongodb Connected'))
    .catch(err => console.log(err))


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})