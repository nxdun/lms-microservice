// Import necessary modules
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
// const ApiKeyValidator = require("./ApiKeyValidator");
// Middleware setup
app.use(express.json());
app.use(cors());
app.use(helmet()); 
// app.use(ApiKeyValidator); // Validate API key
app.use(express.urlencoded({ extended: false }));
const axios = require('axios');

//cloud stoage 
const { Storage } = require('@google-cloud/storage');
const multer = require('multer');
const storage = new Storage({
    keyFilename: './key.json'
});

const bucket = storage.bucket('nxduns');

//multer middleware
const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // no larger than 5mb
    },
});

app.get('/yo', (req, res) => {
    //get all headers to a constant
    const headers = req.headers;
    res.send(headers);
});

//upload file and get signed url
app.post('/api/upload', multerMid.single('file'), (req, res) => {
    console.log(`upload recived : ${req.file}`);
    const file = req.file;
    if(!file) {
        res.status(400).send('No file uploaded.');
        return;
    }
    const fileName = Date.now() + file.originalname;
    const blob = bucket.file(fileName);
    const blobStream = blob.createWriteStream({
        metadata: {
            contentType: file.mimetype
        }
    });

    blobStream.on('error', (err) => {
        res.status(500).send(err);
    });

    blobStream.on('finish',async () => {
        //get the public signed url of the uploaded file for download
        const file = bucket.file(fileName);
        try{
            const [exists] = await file.exists();
            if(!exists){
                res.status(404).send('File not found');
        }
        const signedUrl = await file.getSignedUrl({
            action: 'read',
            expires: '03-09-2491'
        });

        res.status(200).send(signedUrl);
    }catch(err){
            res.status(500).send(err);
        }

    });

    //get signed url of the uploaded file
    blobStream.end(file.buffer);

});

//captcha
app.post('/capcheck', async (req, res) => {
    console.log("capcheck recived ", JSON.stringify(req.body));
    try{
        if(!req.body.captcha){
            return res.status(400).json({ message: 'CapToken is required' });
        }
        const secretKey = "6Leg6dgpAAAAAAlzr64bqduRNTowvB-JbASCAnen";
        const googleUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}`;
       
        const response = await axios.post(googleUrl);
        if(response.data.success){
            res.status(200).json({ message: 'CapToken is valid', success: true });
        }else{
            res.status(400).json({ message: 'CapToken is invalid', success: false });
        }

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', success: false});
    }
});


const port = 2345;
// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}`));

// Export the Express app
module.exports = app;