import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import {MongoClient} from 'mongodb';
import mongoose from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';
import assert from 'assert';

import Auth from './Auth';
import Vehicles from './Vehicles';

import AuthSchema from './schema/auth-schema';
import UserVehicleSchema from './schema/user-vehicle-schema';
import UserSchema from './schema/user-schema';
import VehicleSchema from './schema/vehicle-schema';

const app = new express();
const httpServer = http.createServer(app);
const serverAuth = new Auth();
const vehicles = new Vehicles('vehicles');

const apiPort = 4000;
const DB_ADDRESS = 'mongodb://localhost:27017/car-app';

mongoose.connect(DB_ADDRESS);
const db = mongoose.connection;
const models = {};
db.once('open', buildModels);

app.use(bodyParser.json());

app.post('/checkUsername', (req, res) => {
    serverAuth.checkUsername(req, res, models.AuthModel);
});

app.post('/login', (req, res) => {
    serverAuth.checkLogin(req, res, models.AuthModel);
});

app.post('/register', (req, res) => {
    serverAuth.register(req, res, models.AuthModel, models.UserModel);
});

app.get('/vehicles/:username', (req, res) => {
    vehicles.getVehicles(req, res, models);
});

app.post('/vehicles/new', (req, res) => {
    vehicles.newVehicle(req, res, models);
});

app.get('/', (req, res) => {
    res.json({ message: `connected to ${apiPort}`});
});

httpServer.listen(apiPort, () => {
    console.log('listening on port 4000');
});

function buildModels() {
    console.log('connected to db');
    models['AuthModel'] = mongoose.model('Auth', AuthSchema);
    models['UserModel'] = mongoose.model('User', UserSchema);
    models['UserVehicleModel'] = mongoose.model('User_Vehicle', UserVehicleSchema);
    models['VehicleModel'] = mongoose.model('Vehicle', VehicleSchema.plugin(findOrCreate));
}


/******
connect

login

select car

display car
******/
