const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now
    },
    collectArticle: [
        {
            collectArticleId: String,
            collectArticleDate: String,
        }
    ],
    loveArticle: [
        {
            loveArticleId: String,
            loveArticleDate: String,
        }
    ],
    loveMessage: {
        type: Array
    }
    ,
    trackingBoard: {
        type: Array
    },
    // collectArticle: {
    //     type: [
    //         {
    //             collectArticleId: {
    //                 type: Array,
    //             },
    //             collectArticleDate: {
    //                 type: Date,
    //                 default: Date.now
    //             }
    //         }
    //     ]
    // },

})

module.exports = User = mongoose.model('users', UserSchema)