//import pg from 'pg';
import express from 'express';

const server = new express();

server.get('/', (req, res) => {
    //res.sendFile(__dirname + '/index.html');
    res.sendFile(__dirname + '/login-form/index.html');
});

server.get('/test.tag', (req, res) => {
    res.sendFile(__dirname + '/test.tag');
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
