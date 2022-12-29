const express =require('express'); // back
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
const forums = require('./routes/forums');

// Server port number
const port = 3000;

// CORS Middleware : 서버와 클라이언트의 포트가 다를 때 차단되는 문제를 해결
app.use(cors());

// Set Static folder : 클라이언트 파일 저장 장소 (앵귤러 다 하면 여기에 저장됨!)
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware : body에 담겨온 데이터를 쉽게 처리
app.use(bodyParser.json());

// Passport Middleware : 클라이언트가 서버에 요청할 자격이 있는지 인증
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/forums', forums);

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

// Start Server
app.listen(port, () => {
    console.log('Server stared on port ' + port);
});