import mongoose from 'mongoose';

class Users {
/***************************************
    deleteVehicle(req, res, {UserVehicleModel, UserModel}) {
        const ownedId = mongoose.Types.ObjectId(req.params.vehicleId);
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

    updateUser(req, res, {UserVehicleModel, VehicleModel}) {
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
******************************/
    getUsers(req, {UserModel}, callback) {
        const userId = mongoose.Types.ObjectId(req.params.userId);

        UserModel.findOne({_id: userId}, (err, user) => {
            if (!user.isAdmin) {
                callback('User is not authorized');
                return;
            }

            UserModel.find({}, (err, usersArr) => {
                callback(null, usersArr);
            });
        });
    }
}

export default Users;
