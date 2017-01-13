import socketio from 'socket.io';
import http from 'http';
import express from 'express';
import crypto from 'crypto';

import fs from 'fs';

const app = new express();
const server = http.createServer(app);
const io = socketio(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    //res.sendFile(__dirname + '/login-form/index.html');
});

app.get('/test.tag', (req, res) => {
    res.sendFile(__dirname + '/test.tag');
});

io.on('connection', (socket) => {
    socket.on('login', (username, password) => {
        //check for username, if exists, pull salt, do hash.  if no, send false
    });

    socket.on('register', (username, password) => {
        const ITERATION = 20000;
        const salt = crypto.randomBytes(16);
        const hashed = crypto.pbkdf2Sync(password, salt, ITERATION, 256, 'sha256');

        const store = {ITERATION : ITERATION,
            salt : salt,
            hashed : hashed,
        };

        fs.writeFileSync('testStore', JSON.stringify(store));
    });
});

server.listen(3000, () => {
    console.log('listening on port 3000');
});


/******
connect

login

select car

display car
******/

/*const client = new pg.Client('postgresql://postgres:no1nos@localhost/postgres');

client.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log('connected');
    }
});*/
