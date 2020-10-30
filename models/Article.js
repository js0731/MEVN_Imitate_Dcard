const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ArticlesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    board: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    paragraph: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    response: {
        type: Number,


    },
    love: {
        type: Number,

    },
})

module.exports = Article = mongoose.model('articles', ArticlesSchema)