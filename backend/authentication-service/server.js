// Import necessary modules
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./db');
const helmet = require('helmet');
const ApiKeyValidator = require("./ApiKeyValidator");
// Import routes
const UserRoutes = require('./routes/users');
const AuthRoutes = require('./routes/auth');

// Connect to database
connection();

// Middleware setup
app.use(express.json());
app.use(cors());
app.use(helmet()); 

//Routes
//register
app.use('/api/v1/users', UserRoutes);
//login
app.use('/api/v1/auth', AuthRoutes);

app.use(ApiKeyValidator); // Validate API key

app.get('/yo', (req, res) => {
    //get all headers to a constant
    const headers = req.headers;
    res.send("hi from server");
});
//get service to validate jwt token and return user details
//post service add a single object id to the "createdCourses", only lecturer role,approve is false
//post service to change approve to true, only admin role,by course id 
//post service to add a single object id to the enrolled courses arraylist, only student role, payment gateway eken meka handle karanne


// Define the port for the server to listen on
const port = 2222;

// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}...`));

// Export the Express app
module.exports = app;