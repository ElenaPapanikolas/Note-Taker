// Imports Express
const express = require('express');
// Imports route files
const api = require('./routes/apiRoutes.js');
const html = require('./routes/htmlRoutes.js');

// Initializes Express
const app = express();

// Sets port number that Express server will listen on
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON data and parse URL encoded data
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));

// Serves static files from the public directory
app.use(express.static('public'));

// Sets up route handling
app.use('/api',api);
app.use('/', html);

// Starts the Express server and makes it listen on the specified port
app.listen(PORT, () => 
    console.log(`Listening on port ${PORT}`));