
/*
*   @desc: validate the apikey
*   @param: request, response, next
*   @return:error if invalid apikey
*/
require('dotenv').config();


 function apikeyValidator(req, res, next) {
    const apikey = req.header('x-api-key');
    if (!apikey) {
        return res.status(401).json({ message: 'No API key provided' });
    }
    if (apikey !== process.env.API_KEY) {
        return res.status(401).json({ message: 'Invalid API key' });
    }else{
        next();
    }

    
}

module.exports = apikeyValidator;