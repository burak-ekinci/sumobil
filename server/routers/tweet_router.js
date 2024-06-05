const router = require("express").Router()
const axios = require("axios")
const TweetModel = require("../models/tweet")
const TweetController = require("../controllers/tweet_controller")

// Tweet Kaydetme
router.post("/save",TweetController.SaveTweet)

//Tweet Beğenme
router.post("/like", (req,res) => {
    res.json("hello")
})

module.exports = router