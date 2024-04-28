// Import necessary modules
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./db');
const helmet = require('helmet');

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
app.use('/api/v1/users', UserRoutes);

app.use('/api/v1/auth', AuthRoutes);

app.get('/yo', (req, res) => {
    res.send('Authentication Service');
});



// Define the port for the server to listen on
const port = 1112;

// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}...`));

// Export the Express app
module.exports = app;