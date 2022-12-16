// const Person = require('./person');
// // we cannot do import Person from './person'
// const person1 = new Person ('Seoyoung Yun', 22);
// person1.greeting();
//------------------------------------------------------
// const Logger = require('./logger');

// const logger = new Logger();

// // EventEmitter - catch the event
// logger.on('message', (data) => console.log('Called Listener', data));

// logger.log('Hello World!');
// logger.log('Hi!');
// logger.log('Nice to meet you');
//------------------------------------------------------------

const http = require('http');
const path = require('path');
const fs = require('fs');
const { restart } = require('nodemon');

const server = http.createServer((req, res) => {
    // When I access localhost
    console.log(req.url);

    // if(req.url === '/'){
    //     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => 
    //     {
    //         if (err) throw err;
    //         // 200 response means everthing is okay
    //         res.writeHead(200, { 'Content-Type': 'text/html' });
    //         res.end(content);
    //     });
    // }

    // if(req.url === '/api/users'){
    //     const users = [
    //         { name: 'Jungwoo Kim', age: 24 },
    //         { name: 'Doyoung Kim', age: 26 }
    //     ];

    //     res.writeHead(200, { 'Content-Type': 'application/json' });
    //     res.end(JSON.stringify(users));
    // }

    // Build file path
    let filePath = path.join(__dirname, 'public', req.url === '/' ?
    'index.html' : req.url);

    // Extension of file
    let extname = path.extname(filePath); // 확장자

    // Initial content type
    let contentType = 'text/html';

    // Check ext and set content type
    switch(extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    // Read File
    fs.readFile(filePath, (err, content) => {
        if(err) {
            if(err.code == 'ENOENT') {
                // page isn't found 
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf8');
                })
            } else {
                // Some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }

    });
});

// environment variable || 5000 (not found)
const PORT = process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

