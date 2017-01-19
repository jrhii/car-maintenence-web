
import http from 'http';
import express from 'express';
import crypto from 'crypto';
import rethink from 'rethinkdb';
import fs from 'fs';

const app = new express();
const server = http.createServer(app);
const io = socketio(server);

const DB_ADDRESS = {host: 'localhost', port: 28015};
let connection = null;

/*
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    //res.sendFile(__dirname + '/login-form/index.html');
});

app.get('/test.js', (req, res) => {
    res.sendFile(__dirname + '/test.js');
});

io.on('connection', (socket) => {
    socket.on('login', (username, password) => {
        console.log('Checking Login');

        rethink.table('login').filter(rethink.row('username').eq(username)).
            run(connection, (err, cursor) => {
                if (err) throw err;
                cursor.each((err, row) => {
                    console.log(row.username);
                    if (err) throw err;
                    if (verifyLogin(row, password)) {
                        console.log(`${username} login verified.`);
                        cursor.close;
                    } else {
                        console.log('Bad Login');
                    }
                });
            });
        //check for username, if exists, pull salt, do hash.  if no, send false
    });

    socket.on('register', (username, password) => {
        console.log(`registering ${username}`);
        const ITERATION = 20000;
        const salt = crypto.randomBytes(16);
        const hashed = crypto.pbkdf2Sync(password, salt, ITERATION, 256, 'sha256');

        const store = {
            username : username,
            ITERATION : ITERATION,
            salt : salt,
            hashed : hashed,
        };

        rethink.table('login').insert(store).run(connection, (err, result) => {
            if (err) throw err;
            console.log(JSON.stringify(result, null, 2));
        });
    });
});

rethink.connect(DB_ADDRESS, (err, conn) => {
    if (err) throw err;
    connection = conn;
});
*/
server.listen(4000, () => {
    console.log('listening on port 4000');
});

/*
function verifyLogin(row, password) {
    const freshHash = crypto.pbkdf2Sync(password, row.salt, row.ITERATION, 256, 'sha256');
    fs.writeFileSync('testFreshHash', JSON.stringify(freshHash));
    fs.writeFileSync('testOldHash', JSON.stringify(row.hashed));

    return row.hashed.data === freshHash.data;
}
*/

/******
connect

login

select car

display car
******/
