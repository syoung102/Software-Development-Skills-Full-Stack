// Main server entry point file
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

const port = 3000;

// Cors middle ware - they would get blocked if they try to do certatin requests
app.use(cors());

// When user enter with get, execute call-back function
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

// Open server
app.listen(port, () => {
    console.log('Server stared on port ' + port);
})