

// const Person = module.require('./person');

// let dude1 = new Person('John Dorian', 25);

// dude1.greetings();


// const MyLogger = require('./logger');

// const myLogger = new MyLogger();

// myLogger.on('message', (data) => console.log('Called listener:', data));

// myLogger.log('User-1');

const http = require('http');
const path = require('path');
const fs = require('fs');

// const server = http.createServer((req, res) => {
//     if (req.url == '/') {
//         fs.readFile(path.join(__dirname, 'public', 'homepage.html'), (err, data) => {
//             if (err) throw err;
//             res.writeHead(200, 'Content-Type: text/html')
//             res.end(data);
//         })
//     }

//     if (req.url == '/api/users') {
//         const users = [
//             {name: 'John Dorian', age: 15},
//             {name: 'Chris Turk', age: 16}
//         ]
//         res.writeHead(200, 'Content-Type: application/json')
//         res.end(JSON.stringify(users));
//     }
// })

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

    let extName = path.extname(filePath);

    let contentType = 'text/html';

    switch(extName){
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
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code == 'ENOENT') 
            {
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, data) =>
                {
                    res.writeHead(200, 'Content-Type: text/html');
                    res.end(data, 'utf8');
                }
                )
            } 
            else {
                res.writeHead(500);
                res.end(`Server error: ${err.code}`)
            } 
        }
        else {
            res.writeHead(200, contentType);
            res.end(data, 'utf8');
        }
        
    })
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`server running on port ${PORT}`))