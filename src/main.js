import pg from 'pg';
import express from 'express';

const server = new express();

server.get('/', (req, res) => {
    res.send('connected');
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
