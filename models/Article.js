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
    boardPath: {
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
        type: String,
        require: true
    },
    love: {
        type: Number,
        default: 0,
    },
    message: [
        {
            messageSex: {
                type: String,
                require: true
            },
            messageName: {
                type: String,
                default: 0,
            },
            messageDate: {
                type: String,
                require: true
            },
            messageLove: {
                type: Number,
                default: 0,
            },
            messageContent: {
                type: String,
                require: true
            },
        }
    ],
})

module.exports = Article = mongoose.model('articles', ArticlesSchema)