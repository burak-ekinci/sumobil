const Tweet = require("../models/tweet")

// Tweet Save Function
const SaveTweet = async (req, res) => {
    console.log("**********" , req.body)
    const tweetTemplate = new Tweet({
        username: req.body.username,
        tweetText:req.body.tweetText,
    })
     await tweetTemplate.save()
    .then(tweet => res.json({tweet}))
}

// Tweet Like Function
const LikeTweet = (req,res) => {
    const tweet = GetTweet(req.body);
}

// Tweet Get Function 
const GetTweet = (tw) => {
    const tweet = Tweet.findOne({_id: tw._id})

    if (tweet) {
      return res.json(tweet)
    } else {
      return  res.json({message: "There is no such tweet"})
    }
}


module.exports = {
    SaveTweet,
    GetTweet
}