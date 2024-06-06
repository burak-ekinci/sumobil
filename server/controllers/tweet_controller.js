const Tweet = require("../models/tweet")

// twit kayıt
const SaveTweet = async (req, res) => {
    console.log("**********" , req.body)
    const tweetTemplate = new Tweet({
        username: req.body.username,
        tweetText:req.body.tweetText,
    })
     await tweetTemplate.save()
    .then(tweet => res.json({tweet}))
}

// twit beğenme
const LikeTweet = (req,res) => {
    const tweet = GetTweet(req.body);
}

// tüm tweetleri getir
const GetTweet = async (req,res) => {
    const tweet = await Tweet.find()

    if (tweet) {
      return res.json({tweets: tweet})
    } else {
      return  res.json({message: "There is no such tweet"})
    }
}

// herhangi bir kullanıcının twitini getir
const GetMyTweet = async (req,res) => {
    const tweet = await Tweet.find()

    if (tweet) {
      return res.send(tweet)
    } else {
      return  res.json({message: "There is no such tweet"})
    }
}


module.exports = {
    SaveTweet,
    GetTweet,
    GetMyTweet
}