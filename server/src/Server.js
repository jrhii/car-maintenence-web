import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import {MongoClient} from 'mongodb';
import mongoose from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';

import Auth from './Auth';
import Vehicles from './Vehicles';
import VehicleDetail from './VehicleDetail';
import Users from './Users';

import AuthSchema from './schema/auth-schema';
import UserVehicleSchema from './schema/user-vehicle-schema';
import UserSchema from './schema/user-schema';
import VehicleSchema from './schema/vehicle-schema';

const app = new express();
const httpServer = http.createServer(app);
const serverAuth = new Auth();
const vehicleDetail =  new VehicleDetail();
const vehicles = new Vehicles();
const users = new Users();

const apiPort = 4000;
const DB_ADDRESS = 'mongodb://localhost:27017/car-app';

mongoose.connect(DB_ADDRESS);
const db = mongoose.connection;
const models = {};
db.once('open', () => {
    buildModels(testAdmin);//ONLY FOR DEV PURPOSES
});

app.use(bodyParser.json());

app.get('/api/checkUsername/:username', (req, res) => {
    serverAuth.checkUsername(req.params.username, models, (err, exists) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.json(exists);
    });
});

app.post('/api/login', (req, res) => {
    serverAuth.checkLogin(req, res, models);
});

app.post('/api/register', (req, res) => {
    const login = {username: req.body.username, password: req.body.password};
    serverAuth.register(login, models, (statusCode, userId) => {
        if (statusCode) {
            res.sendStatus(statusCode);
        } else {
            res.json(userId);
        }
    });
});

app.get('/api/vehicles/get/:userId', (req, res) => {
    vehicles.getVehicles(req.params.userId, models, (err, vehicles) => {
        if (err) {
            console.log(`error 3! ${err}`);
            res.sendStatus(500);
        } else {
            res.json(vehicles);
        }
    });
});

app.post('/api/vehicles/edit', (req, res) => {
    vehicles.updateVehicle(req, res, models);
});

app.delete('/api/vehicles/delete/:vehicleId', (req, res) => {
    vehicles.deleteVehicle(req, res, models);
});

app.post('/api/vehicles/new', (req, res) => {
    vehicles.newVehicle(req, res, models);
});

app.get('/api/vehicles/details/get/:ownedId', (req, res) => {
    vehicleDetail.getDetails(req, res, models);
    //_displayDb();
});

app.post('/api/vehicles/details/addFillup', (req, res) => {
    vehicleDetail.addFillup(req, res, models);
});

app.get('/api/admin/users/:userId', (req, res) => {
    users.getUsers(req, models, (err, usersArr) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const returnArr = [];
            for (let user of usersArr) {
                vehicles.getVehicles(user._id, models, (err, vehicleArr) => {
                    if (err) {
                        res.sendStatus(500);
                        return;
                    }
                    returnArr.push({user, vehicleArr});

                    if (returnArr.length === usersArr.length) {
                        res.json(returnArr);
                    }
                });
            }
        }
    });
});

app.get('/', (req, res) => {
    res.json({ message: `connected to ${apiPort}`});
});

httpServer.listen(apiPort, () => {
    console.log('listening on port 4000');
});

function buildModels(callback) {
    console.log('connected to db');
    models['AuthModel'] = mongoose.model('Auth', AuthSchema);
    models['UserModel'] = mongoose.model('User', UserSchema);
    models['UserVehicleModel'] = mongoose.model('User_Vehicle', UserVehicleSchema);
    models['VehicleModel'] = mongoose.model('Vehicle', VehicleSchema.plugin(findOrCreate));

    if (callback) {
        callback();
    }
}

function _displayDb() {
    for (let model in models) {
        if (models.hasOwnProperty(model)) {
            console.log(model);
            models[model].find((err, res) => {
                console.log(`${model}\n ${res}`);
            });
        }
    }
}

function testAdmin() {
    console.log('Creating test admin');
    serverAuth.register({username: 'admin', password: 'admin'}, models, (statusCode, userId) => {
        if (statusCode) {
            switch (statusCode) {
            case 401:
                console.log('admin already exists');
                break;
            case 500:
                console.log('Mongo error');
                break;
            default:
                console.log(`Unkown error ${statusCode}`);
                break;
            }
        } else {
            serverAuth.setAdmin(userId, true, models, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('created admin');
                }
            });
        }


    });
}


/******
connect

login

select car

display car
******/
