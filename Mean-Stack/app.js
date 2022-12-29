// Main server entry point file
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error: '+err);
});

const app = express();

const users = require('./routes/users');

// Port Number
const port = process.env.PORT || 3000;

// Cors Middleware - they would get blocked if they try to do certatin requests
app.use(cors());

// Set Static folder - place to put client-sid files
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware - when user submit a form, you can grab the data
app.use(bodyParser.json());

// Passport Middleware - 클라이언트가 서버에 요청할 자격이 있는지 인증
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// Index Route- When user enter with get, execute call-back function
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server
app.listen(port, () => {
    console.log('Server stared on port ' + port);
});