import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import {MongoClient} from 'mongodb';
import assert from 'assert';
import Auth from './Auth';


const app = new express();
const httpServer = http.createServer(app);
const serverAuth = new Auth(('login'));

const apiPort = 4000;
const DB_ADDRESS = 'mongodb://localhost:27017/car-app';
let db = null;
app.use(bodyParser.json());

app.post('/checkUsername', (req, res) => {
    serverAuth.checkUsername(req, res, db);
});

app.post('/login', (req, res) => {
    serverAuth.checkLogin(req, res, db);
});

app.post('/register', (req, res) => {
    serverAuth.register(req, res, db);
});

app.get('/', (req, res) => {
    res.json({ message: `connected to ${apiPort}`});
});


MongoClient.connect(DB_ADDRESS, (err, conn) => {
    assert.equal(null, err);
    console.log('connected to db');

    db = conn;
});

httpServer.listen(apiPort, () => {
    console.log('listening on port 4000');
});


/******
connect

login

select car

display car
******/
