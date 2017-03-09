import mongoose from 'mongoose';

class Vehicles {
    deleteVehicle(req, res, {UserVehicleModel, UserModel}) {
        const ownedId = mongoose.Types.ObjectId(req.params.vehicleId);
        console.log(`deleting user vehicle ${ownedId}`);

        UserVehicleModel.findOneAndRemove({_id: ownedId}, (err, deleted) => {
            if (err) {
                this._handleErr(err, res);
                return;
            }

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
            if (err) {
                this._handleErr(err, res);
                return;
            }

            VehicleModel.findOrCreate(vehicleUpdate, (err, newVehicle) => {
                if (err) {
                    this._handleErr(err, res);
                    return;
                }

                userVehicle.vehicleId = newVehicle._id;
                userVehicle.save(err => {
                    if (err) throw err;

                    console.log(`${newVehicle.model} updated`);
                    res.json(newVehicle);
                });
            });
        });
    }

    getVehicles(userId, {UserVehicleModel, VehicleModel}, callback) {
        console.log(`getting vehicles for ${userId}`);

        UserVehicleModel.find({userId: userId}, (err, vehicles) => {
            if (err) {
                console.log(err);
                callback(err);
                return;
            }

            const returnArr = [];

            if (vehicles.length === 0) {
                callback(null, returnArr);
                return;
            }

            vehicles.forEach((ownedVehicle) => {
                VehicleModel.findOne({_id: ownedVehicle.vehicleId}, (err, vehicle) => {
                    if (err) {
                        console.log(err);
                        callback(err);
                        return;
                    }

                    returnArr.push({
                        year: vehicle.year,
                        make: vehicle.make,
                        model: vehicle.model,
                        opt: vehicle.opt,
                        id: ownedVehicle._id.toString('hex'),
                    });

                    if (returnArr.length === vehicles.length) {
                        console.log('sending vehicles back');
                        callback(null, returnArr);
                    }
                });
            });
        });
    }

    newVehicle(req, res, {VehicleModel, UserModel, UserVehicleModel}) {
        const userId = mongoose.Types.ObjectId(req.body.userId);
        const vehicle = {
            year: req.body.year,
            make: req.body.make,
            model: req.body.model,
            opt: req.body.opt,
        };

        console.log('adding vehicle');

        VehicleModel.findOrCreate(vehicle, (err, result) => {
            if (err) {
                this._handleErr(err, res);
                return;
            }

            const userVehicle = {
                userId,
                vehicleId: result._id,
            };

            new UserVehicleModel(userVehicle).save((err, inserted) => {
                if (err) {
                    this._handleErr(err, res);
                    return;
                }

                UserModel.findOne({_id: userId}, (err, user) => {
                    if (err) {
                        UserVehicleModel.findOneAndRemove({_id: inserted._id}, (err) => {
                            if (err) throw err;
                        });
                        return;
                    }
                    user.ownedIds.push(inserted._id);
                    user.save((err) => {
                        if (err) {
                            UserVehicleModel.findOneAndRemove({_id: inserted._id}, (err) => {
                                if (err) throw err;
                            });
                            return;
                        }
                        res.sendStatus(200);
                        console.log('finished vehicle add');
                    });
                });
            });
        });
    }

    _handleErr(err, res) {
        console.log(err);
        res.sendStatus(500);
    }
}

export default Vehicles;
