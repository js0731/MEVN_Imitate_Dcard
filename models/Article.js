const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ArticlesSchema = new Schema({
    sex: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    selectedBoard: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        require: true
    },
})

module.exports = Article = mongoose.model('articles', ArticlesSchema)