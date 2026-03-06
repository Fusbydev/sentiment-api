const express = require('express');
const {getTickerSentiment} = require('./engine');

const app = express();


app.get('/ticker/:ticker', async (req, res) => {
    const ticker = req.params.ticker;

    console.log(`checking sentiment for ${ticker}`);

    try{
        const sentiment = await getTickerSentiment(ticker);
        res.json(sentiment);
    }catch(e){
        res.status(500).json({error: e.message});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ API is live at http://localhost:${PORT}`);
  console.log(`👉 Test it: http://localhost:${PORT}/sentiment/TSLA`);
});
