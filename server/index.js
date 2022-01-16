const express = require('express')
const mongoose = require("mongoose");
const cors = require("cors");
const app = express()
const MemeModel = require("./models/Meme");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://shrinath:memeTemplate@memeinfo.jp6xa.mongodb.net/memeInformation?retryWrites=true&w=majority", {
    useNewUrlParser: true,
})
    .then((result) => app.listen(3001, () => {
        console.log("server is running on port 3001");
    }))
    .catch((err) => console.log(err));

app.post('/addMemeTemplate', async (req, res) => {

    const memeName = req.body.memeName;
    const memeTags = req.body.memeTags;
    const emotion = req.body.emotion;
    const language = req.body.language;
    const meme = new MemeModel({
        memeName: memeName,
        memeTags: memeTags,
        emotion: emotion,
        language: language
    });

    try {
        await meme.save();
        res.send("inserted data");
    } catch (err) {
        console.log(err);
    }
})

