// Import necessary modules
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const ApiKeyValidator = require("./ApiKeyValidator");
app.use(ApiKeyValidator);
// Middleware setup
app.use(express.json());
app.use(cors());
app.use(helmet()); 
app.use(ApiKeyValidator); // Validate API key


const { Storage } = require('@google-cloud/storage');
const multer = require('multer');
//cloud stoage 
const storage = new Storage({
    keyFilename: './key.json'
});

app.get('/yo', (req, res) => {
    //get all headers to a constant
    const headers = req.headers;
    res.send(headers);
});


const port = 2345;
// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}...`));

// Export the Express app
module.exports = app;