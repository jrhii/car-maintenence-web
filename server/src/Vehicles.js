class Vehicles {
    constructor(collectionStr) {
        this.collectionStr = collectionStr;
    }

    getVehicles(req, res, {UserModel, UserVehicleModel, VehicleModel}) {
        console.log(`getting vehicles for ${req.params.username}`);
        const username = req.params.username.toLowerCase();

        UserModel.find({ username: username}, (err, arr) => {
            if (err) throw err;
            if (arr.length !== 1) throw console.log(`incorrect number of users ${username}: ${arr.length}`);
            const user = arr[0];

            const vehicleArr = [];
            for (let vehicleId of user.ownedIds) {
                console.log(vehicleId);
                UserVehicleModel.findOne({_id: vehicleId}, (err, ownedVehicle) => {
                    if (err) throw err;
                    VehicleModel.findOne({_id: ownedVehicle.vehicleId}, (err, vehicle) => {
                        if (err) throw err;
                        
                        vehicleArr.push({
                            year: vehicle.year,
                            make: vehicle.make,
                            model: vehicle.model,
                        });
                    });
                });
            }

            res.json(vehicleArr);
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
}

export default Vehicles;
