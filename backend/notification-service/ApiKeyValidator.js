require("dotenv").config(); 

//middleware
const ValdateApiKey = (req, res, next) => {
    //get API key from request header
    const apiKey = req.header("x-api-key");

    console.log("req  ",JSON.stringify(req.headers));

    //check if API key is missing
    if (!apiKey) {
        return res.status(401).json({
            code: 401,
            status: "Error",
            message: "API key is missing.",
            data: null,
        });
    }

    //check if API key is valid
    if (apiKey !== process.env.API_KEY) {
        return res.status(403).json({
            code: 403,
            status: "Error",
            message: "Invalid API key.",
            data: null,
        });
    }

    next(); //continue to next middleware
}

module.exports = ValdateApiKey;