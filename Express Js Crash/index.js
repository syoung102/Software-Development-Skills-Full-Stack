const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
// bring members into index.js
const members = require('./Member')

const app = express();


// Init middleware
app.use(logger);

// Get All Members
app.get('/api/members', (req, res) => res.json(members));

// You have to make all page if you wrote like this
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); // listen on a port
