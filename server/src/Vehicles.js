import mongoose from 'mongoose';

class Vehicles {
    constructor(models) {
        this.models = models;
    }

    deleteVehicle(req, res, {UserVehicleModel, UserModel}) {
        const ownedId = mongoose.Types.ObjectId(req.body.id);
        console.log(`deleting user vehicle ${ownedId}`);

        UserVehicleModel.findOneAndRemove({_id: ownedId}, (err, deleted) => {
            if (err) throw err;

            UserModel.findOne({_id: deleted.userId}, (err, user) => {
                if (err) throw err;

                const idIndex = user.ownedIds.findIndex(id => {
                    return id.toString() === ownedId.toString();
                });

                user.ownedIds.splice(idIndex, 1);

                user.save((err, updated) => {
                    if (err) throw err;
                    const indexSearch = updated.ownedIds.findIndex(id => id === ownedId);

                    if (indexSearch !== -1) {
                        res.sendStatus(500);
                        throw updated;
                    } else {
                        console.log(`deleted user vehicle ${deleted._id}`);
                        res.sendStatus(200);
                    }
                });
            });
        });
    }

    updateVehicle(req, res, {UserVehicleModel, VehicleModel}) {
        console.log(`updating ${req.body.model}`);
        const ownedId = mongoose.Types.ObjectId(req.body.id);

        const vehicleUpdate = {
            year: req.body.year,
            make: req.body.make,
            model: req.body.model,
            opt: req.body.opt,
        };

        UserVehicleModel.findOne({_id: ownedId}, (err, userVehicle) => {
            if (err) throw err;

            VehicleModel.findOrCreate(vehicleUpdate, (err, newVehicle) => {
                if (err) throw err;

                userVehicle.vehicleId = newVehicle._id;
                userVehicle.save(err => {
                    if (err) throw err;

                    console.log(`${newVehicle.model} updated`);
                    res.json(newVehicle);
                });
            });
        });
    }

    getVehicles(req, res, {UserModel, UserVehicleModel, VehicleModel}) {
        console.log(`getting vehicles for ${req.params.username}`);
        const username = req.params.username.toLowerCase();

        UserModel.find({ username: username}, (err, arr) => {
            if (err) throw err;
            if (arr.length !== 1) throw console.log(`incorrect number of users ${username}: ${arr.length}`);
            const user = arr[0];

            UserVehicleModel.find({userId: user._id}, (err, vehicles) => {
                if (err) throw err;

                const returnArr = [];
                vehicles.forEach((ownedVehicle) => {
                    VehicleModel.findOne({_id: ownedVehicle.vehicleId}, (err, vehicle) => {
                        if (err) throw err;

                        returnArr.push({
                            year: vehicle.year,
                            make: vehicle.make,
                            model: vehicle.model,
                            id: ownedVehicle._id.toString('hex'),
                        });

                        if (returnArr.length === vehicles.length) {
                            res.json(returnArr);
                        }
                    });
                });
            });
        });
    }

    newVehicle(req, res, {VehicleModel, UserModel, UserVehicleModel}) {
        const username = req.body.username.toLowerCase();
        const vehicle = {
            year: req.body.year,
            make: req.body.make,
            model: req.body.model,
            opt: req.body.opt,
        };

        console.log('adding vehicle');

        UserModel.find({username: username}, (err, arr) => {
            if (err) throw err;
            if (arr.length !== 1) throw console.log(`incorrect number of users ${username}: ${arr.length}`);
            const user = arr[0];

            VehicleModel.findOrCreate(vehicle, (err, result) => {
                if (err) throw err;

                const userVehicle = {
                    userId: user._id,
                    vehicleId: result._id,
                };

                new UserVehicleModel(userVehicle).save((err, inserted) => {
                    if (err) throw err;

                    user.ownedIds.push(inserted._id);
                    UserModel.findOneAndUpdate({_id: user._id}, {ownedIds: user.ownedIds}, (err) =>{
                        if (err) throw err;
                        res.sendStatus(200);
                        console.log('finished vehicle add');
                    });
                });
            });
        });
    }

    _displayDb() {
        this.models.VehicleModel.find((err, res) => {
            console.log(`Vehicles\n ${res}`);
        });
        this.models.UserVehicleModel.find((err, res) => {
            console.log(`User Vehicles\n ${res}`);
        });
        this.models.UserModel.find((err, res) => {
            console.log(`Users\n ${res}`);
        });
    }
}

export default Vehicles;
