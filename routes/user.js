const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const dateFormat = require('dateformat');

const User = require('../models/User');
const Article = require('../models/Article');
const { route } = require('./board');

router.get('/', (req, res) => {
    res.json({ msg: 'user works' });
});



router.post('/register', (req, res) => {
    // 查詢是否已經註冊過
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) { // 如果user存在
                return res.status.json({ email: "郵件已註冊過" })
            } else { // 如果user不存在，進行註冊動作
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    sex: req.body.sex,
                })

                // 加密函式 (使用者密碼, 加鹽次數多越安全相對的加密時間就越長, callback)
                bcrypt.hash(newUser.password, 10, function (err, hash) {
                    if (err) throw err
                    newUser.password = hash  // 將newUser.password 改為加密密碼
                    newUser.save() // 將資訊存入mongodb
                        .then(user => res.json('註冊成功!!')) // 成功回傳
                        .catch(err => console.log(err)) // 錯誤回傳
                });
            }
        })
})




router.post('/login', (req, res) => {
    // 查詢資料庫
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ email: "email不存在" })
            }
            // 驗證加密密碼 (使用者輸入的密碼,  資料庫內的bcrypt密碼, callback)
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (result) {  // 密碼比對為true
                    // 存放在jwt token的資料(不見得是要使用者資料)
                    const payload = {
                        id: user.id,
                        sex: user.sex,
                        name: user.name,
                        email: user.email,
                        data: user.date
                    }
                    // 產生token (存放資訊, 簽章, 過期時間, callback)
                    jwt.sign(payload, process.env.SECRET, { expiresIn: 36000 }, (err, token) => {
                        if (err) throw err
                        console.log(payload);
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        })
                    })
                } else {  // 密碼比對為 false
                    console.log(err);
                    return res.status(400).json({ password: '密碼錯誤' })
                }
            });
        })
})

// 新增文章

router.post('/addarticle', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.body.username, req.body.sex, req.body.date, req.body.selectedBoard, req.body.title, req.body.content);
    Article.create({
        username: req.body.username,
        sex: req.body.sex,
        date: req.body.date,
        selectedBoard: req.body.selectedBoard,
        boardPath: req.body.boardPath,
        title: req.body.title,
        content: req.body.content,
    })
        .then(article => {
            res.json({ message: 'success ' })
        })
        .catch(err => {
            console.log(err);
        })
})


// 收藏文章

router.post('/collectarticle', passport.authenticate('jwt', { session: false }), (req, res) => {
    const collectData = {
        collectArticleId: req.body.articleId,
        collectArticleDate: new Date()
    }
    User.updateOne({ _id: req.body.userId }, {
        $push: {
            collectArticle: [collectData]
        }
    }, (err, result) => {
        if (err) console.log(err);
        res.json(collectData)
    })
    console.log(collectData);
})



router.post('/cancelcollect', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.updateOne({ _id: req.body.userId }, {
        $pull: {
            collectArticle: {
                collectArticleId: req.body.articleId,
            }
        }
    }, (err, userData) => {
        if (err) console.log(err);
        console.log(userData);
        User.findById({ _id: req.body.userId })
            .then(data => {
                console.log(data.collectArticle);
                res.json(data.collectArticle)
            })
            .catch(err => console.log(err))
    })
})

// 
router.get('/information/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findById({ _id: req.params.id })
        .then(userData => {
            res.json(userData)
        })
        .catch(err => {
            console.log(err);
        })
})

router.post('/dynamicdata', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findById({ _id: req.body.userId })
        .then(user => {
            res.json({
                collectArticle: user.collectArticle,
                loveArticle: user.loveArticle,
                trackingBoard: user.trackingBoard,
            }
            )
        })
})

// 從收藏文章id取得收藏文章整體資料
router.post('/collect/article/data', passport.authenticate('jwt', { session: false }), async (req, res) => {
    // 找出使用者的收藏文章id和date
    let userCollectData
    await User.findById({ _id: req.body.userId })
        .then(userData => {
            userCollectData = userData.collectArticle
        })
        .catch(err => {
            console.log(err);
        })
    let userCollectId = userCollectData.map(x => x.collectArticleId);
    let completed_article = [];
    Article.find({ _id: { $in: userCollectId } })
        .then(allCollectArticle => {
            // 把所有文章加讓收藏日期
            for (let i = 0; i < userCollectId.length; i++) {
                let collectId = JSON.stringify(userCollectId[i]);
                for (let j = 0; j < allCollectArticle.length; j++) {
                    let articleId = JSON.stringify(allCollectArticle[j]._id)
                    if (collectId === articleId) {
                        completed_article.push({
                            collectArtId: userCollectData[i].collectArticleId,
                            collectDate: userCollectData[i].collectArticleDate,
                            article: allCollectArticle[j]
                        })
                        break
                    }

                }
            }

            res.json(completed_article)
        })
        .catch(err => {
            console.log(err);
        })
})


router.post('/leave/message', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.body.articleId);
    console.log(req.body.messageData);
    Article.updateOne({ _id: req.body.articleId }, {
        $push: {
            message: req.body.messageData
        }
    }, (err, result) => {
        if (err) console.log(err);
        Article.findById({ _id: req.body.articleId }, (err, data) => {
            res.json(data.message)
        })
    })
})

router.post('/delete/message', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.body.articleId);
    console.log(req.body.messageId);
    Article.updateOne({ _id: req.body.articleId }, {
        $pull: {
            message: {
                _id: req.body.messageId,
            }
        }
    }, (err, result) => {
        if (err) console.log(err);
        Article.findById({ _id: req.body.articleId }, (err, data) => {
            res.json(data.message)
        })
    })
})



router.post('/tracking/board', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.body);
    User.updateOne({ _id: req.body.userId }, {
        $push: {
            trackingBoard: req.body.boardName
        }
    }, (err, result) => {
        if (err) console.log(err);
        User.findById({ _id: req.body.userId })
            .then(data => { res.json(data.trackingBoard) })
            .catch(err => console.log(err))
    })

})


router.post('/cancel/tracking/board', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.body);
    User.updateOne({ _id: req.body.userId }, {
        $pull: {
            trackingBoard: req.body.boardName
        }
    }, (err, result) => {
        if (err) console.log(err);
        User.findById({ _id: req.body.userId })
            .then(data => { res.json(data.trackingBoard) })
            .catch(err => console.log(err))
    })

})


router.post('/love/article', passport.authenticate('jwt', { session: false }), (req, res) => {

    Article.updateOne({ _id: req.body.articleId }, { $inc: { love: 1 } })
        .then(result => {
            User.updateOne({ _id: req.body.userId }, {
                $push: {
                    loveArticle: [{ loveArticleId: req.body.articleId }]
                }
            }, (err, result) => {
                if (err) console.log(err);
                res.json({ loveArticleId: req.body.articleId })
            })
        })

})

router.post('/cancel/love/article', passport.authenticate('jwt', { session: false }), (req, res) => {
    Article.updateOne({ _id: req.body.articleId }, { $inc: { love: -1 } })
        .then(result => {
            User.updateOne({ _id: req.body.userId }, {
                $pull: {
                    loveArticle: {
                        loveArticleId: req.body.articleId,
                    }
                }
            }, (err, result) => {
                if (err) console.log(err);
                res.json({ loveArticleId: req.body.articleId })
            })
        })

})


module.exports = router








