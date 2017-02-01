import http from 'http';
import https from 'https';
import express from 'express';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import {MongoClient} from 'mongodb';
import assert from 'assert';


const app = new express();
const httpServer = http.createhttpServer(app);

const DB_ADDRESS = 'mongodb://localhost:27017/car-app';
let db = null;
app.use(bodyParser.json());

app.post('/checkUsername', (req, res) => {

    const username = req.body.username.toLowerCase();
    const collection = db.collection('login');

    console.log(`Checking username ${username}`);

    collection.find({ username: username}).toArray((err, result) => {
        if (result.length > 0) {
            console.log(`${username} exists.`);
            res.json({ exists: true});
        } else {
            console.log(`${username} not found.`);
            res.json({ exists: false});
        }
    });
});

app.post('/login', (req, res) => {
    const collection = db.collection('login');
    const login = {
        username: req.body.username.toLowerCase(),
        password: req.body.password,
    };

    console.log('Checking Login');

    collection.find({ username: login.username}).toArray((err, result) => {
        if (err) throw err;
        if (result.length !== 1) {
            throw console.log('Error in username number!' + result);
        }

        const loginAttempt = result[0];

        if (verifyLogin(loginAttempt, login.password)) {
            res.sendStatus(200).end();
            console.log(`${login.username} login verified.`);
        } else {
            res.sendStatus(401).end();
            console.log('Bad Login');
        }
    });
});

app.post('/register', (req, res) => {
    const collection = db.collection('login');
    const login = {
        username: req.body.username.toLowerCase(),
        password: req.body.password,
    };

    console.log(`registering ${login.username}`);
    const ITERATION = 20000;
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(login.password, salt, ITERATION, 256, 'sha256', (err, key) => {

        const store = {
            username : login.username,
            ITERATION,
            salt,
            hashed : key.toString('hex'),
        };

        //TODO ONLY ON USER CHECK

        collection.insertOne(store, (err, result) => {
            if (err) throw err;
            console.log(result.ops.length);
            if (result.ops.length === 1) {
                res.sendStatus(201);
            }
        });
    });
});


MongoClient.connect(DB_ADDRESS, (err, conn) => {
    assert.equal(null, err);
    console.log('connected to db');

    db = conn;
});

httpServer.listen(4000, () => {
    console.log('listening on port 4000');
});


function verifyLogin(row, password) {
    const freshHash = crypto.pbkdf2Sync(password, row.salt.buffer, row.ITERATION, 256, 'sha256').toString('hex');

    return row.hashed === freshHash;
}


/******
connect

login

select car

display car
******/
