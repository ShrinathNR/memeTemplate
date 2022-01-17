const express = require('express')
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser'); 
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express()
const MemeModel = require("./models/Meme");

app.use(express.json());
app.use(cors());

//for storing uploaded images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null,Date.now()+'-'+ file.originalname)
    }
});
  
const upload = multer({ storage: storage });

mongoose.connect("mongodb+srv://shrinath:memeTemplate@memeinfo.jp6xa.mongodb.net/memeInformation?retryWrites=true&w=majority", {
    useNewUrlParser: true,
})
    .then((result) => app.listen(3001, () => {
        console.log("server is running on port 3001");
    }))
    .catch((err) => console.log(err));

app.post('/addMemeTemplate',upload.single("memeImage"), async(req, res) => {

    const memeName = req.body.memeName;
    const memeTags = req.body.memeTags;
    const emotion = req.body.emotion;
    const language = req.body.language;
    const image = req.file.filename;
    const meme = new MemeModel({
        memeName: memeName,
        memeTags: memeTags,
        emotion: emotion,
        language: language,
        memeImage:image
    });

    try {
        await meme.save();
        res.send("inserted data");
    } catch (err) {
        console.log(err);
    }
});

app.get("/read", async (req,res)=>{
    MemeModel.find({}, (err,result)=>{
        if(err){
            res.send(err);
        }
        res.send(result);
    });
});