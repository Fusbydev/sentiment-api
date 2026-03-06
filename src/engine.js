const Snoowrap = require('snoowrap');
const WinkNLP = require('wink-nlp');
const WinkEngLiteWebModel = require('wink-eng-lite-web-model');
const nlp = new WinkNLP(WinkEngLiteWebModel);

require('dotenv').config();

const reddit = new Snoowrap({
    userAgent: 'SentimentBot/1.0',
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    username: process.env.REDDIT_USERNAME,
    password: process.env.REDDIT_PASSWORD,
});

async function getTickerSentiment(ticker) {
    try{
        const post = await reddit.subreddit('wallstreetbets').search({
            query: `$${ticker}`,
            sort: 'new',
            time: 'day',
            limit: 15
        });

        if(postMessage.length === 0) {
            return {
                ticker,
                score: 0,
                mentions: 0,
                status: 'no mentions' 
            };
        }

        let totalScore = 0;

        post.array.forEach(post => {
            const doc = nlp.readDoc(`${post.title} ${post.selftext}`);
            totalScore += doc.getSentiment();
        });

        const avgScore = totalScore / post.array.length;

        return {
            ticker: ticker.toUpperCase(),
            score: Number(avgScore.toFixed(2)),
            mentions: post.length,
            sentiment: avgScore > 0.05 ? 'Bullish' : avgScore < -0.05 ? 'Bearish' : 'Neutral'
        };

    } catch (err) {
        console.log("ENGINE ERROR: ", err);
    }

    modules.exports = {getTickerSentiment};
}


