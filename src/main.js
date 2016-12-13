import pg from 'pg';

const client = new pg.Client('postgresql://postgres:no1nos@localhost/postgres');

client.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log('connected');
    }
});
