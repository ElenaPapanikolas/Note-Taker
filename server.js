const express = require('express');

// Imports route files
const api = require('./routes/apiRoutes.js');
const html = require('./routes/htmlRoutes.js');


const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON data and parse URL encoded data
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));

// Serves static files from the public directory
app.use(express.static('public'));

// Sets up routes handling
app.use('/api',api);
app.use('/', html);

app.listen(PORT, () => 
    console.log(`Listening on port ${PORT}`));