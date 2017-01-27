
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import rethink from 'rethinkdb';

const app = new express();
const server = http.createServer(app);

const DB_ADDRESS = {host: 'localhost', port: 28015};
let connection = null;
app.use(bodyParser.json());

app.post('/checkUsername', (req, res) => {
    res.sendStatus(200);

    const username = req.body.username.toLowerCase();

    console.log(`Checking username ${username}`);

    rethink.table('login').filter(rethink.row('username').eq(username)).
        run(connection, (err, cursor) => {
            if (err) throw err;
            cursor.toArray((err, arr) => {
                if (arr.length > 0) {
                    console.log(`${username} exists.`);
                } else {
                    console.log(`${username} not found.`);
                }
            });
        });
});

app.post('/login', (req, res) => {
    const login = {
        username: req.body.username.toLowerCase(),
        password: req.body.password,
    };

    console.log('Checking Login');

    rethink.table('login').filter(rethink.row('username').eq(login.username)).
        run(connection, (err, cursor) => {
            if (err) throw err;
            cursor.each((err, row) => {
                console.log(row.username);
                if (err) throw err;
                if (verifyLogin(row, login.password)) {
                    res.sendStatus(200);
                    console.log(`${login.username} login verified.`);
                    cursor.close;
                } else {
                    res.sendStatus(401);
                    console.log('Bad Login');
                }
            });
        });
});

app.post('/register', (req, res) => {
    res.sendStatus(200);

    const login = {
        username: req.body.username.toLowerCase(),
        password: req.body.password,
    };

    console.log(`registering ${login.username}`);
    const ITERATION = 20000;
    const salt = crypto.randomBytes(16);
    const hashed = crypto.pbkdf2Sync(login.password, salt, ITERATION, 256, 'sha256').toString('hex');

    const store = {
        username : login.username,
        ITERATION : ITERATION,
        salt : salt,
        hashed : hashed,
    };

    rethink.table('login').insert(store).run(connection, (err, result) => {
        if (err) throw err;
        console.log(JSON.stringify(result, null, 2));
    });
});


rethink.connect(DB_ADDRESS, (err, conn) => {
    if (err) throw err;
    connection = conn;
});

server.listen(4000, () => {
    console.log('listening on port 4000');
});


function verifyLogin(row, password) {
    const freshHash = crypto.pbkdf2Sync(password, row.salt, row.ITERATION, 256, 'sha256').toString('hex');

    return row.hashed === freshHash;
}


/******
connect

login

select car

display car
******/
