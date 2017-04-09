import TripsSchema from './schema/trips-schema.js';
import mongoose from 'mongoose';

class VehicleDetail {
    getDetails(req, res, {UserVehicleModel}) {
        const TripsModel = mongoose.model(`Trips_${req.params.ownedId}`, TripsSchema),
            resJson = {vehicle: {}, trips: []};

        UserVehicleModel.findOne({_id: req.params.ownedId}, (err, ownedVehicle) => {
            if (err) {
                this._handleErr(err, res);
                return;
            }

            if (!ownedVehicle) {
                res.sendStatus(400);
                return;
            }

            for (const key in ownedVehicle) {
                if (key !== '_id') {
                    resJson.vehicle[key] = ownedVehicle[key];
                }
            }

            TripsModel.find({}).sort({date: 'desc'}).exec((err, arr) => {
                if (err) {
                    this._handleErr(err, res);
                    return;
                }

                resJson.trips = arr.slice(0,4);

                res.json(resJson);
            });
        });
    }

    addFillup(req, res, {UserVehicleModel}) {
        const TripsModel = mongoose.model(`Trips_${req.body.ownedId}`, TripsSchema),
            tripGallons = req.body.gallons,
            totalMiles = req.body.miles,
            tripCost = req.body.cost,
            date = new Date(req.body.date),
            ownedId = mongoose.Types.ObjectId(req.body.ownedId);

        console.log('adding Fillup');

        UserVehicleModel.findOne({_id: ownedId}, (err, ownedVehicle) => {
            if (err) {
                console.log('1');
                this._handleErr(err, res);
                return;
            }

            let tripMiles = totalMiles - ownedVehicle.totalMiles;
            ownedVehicle.latestUpdate = date;
            ownedVehicle.markModified('latestUpdate');
            ownedVehicle.totalMiles = totalMiles;
            ownedVehicle.totalGallons += tripGallons;
            ownedVehicle.totalCost += tripCost;

            if (ownedVehicle.startMiles < 0) {
                ownedVehicle.startMiles = totalMiles;
                ownedVehicle.startGallons = tripGallons;
                ownedVehicle.startCost = tripCost;
                tripMiles = -1;
                ownedVehicle.totalGallons = tripGallons;
                ownedVehicle.totalCost = tripCost;
            }

            const newTrip = {
                date: date,
                miles: totalMiles,
                tripMiles: tripMiles,
                gallons: tripGallons,
                cost: tripCost,
            };

            new TripsModel(newTrip).save((err, created) => {
                if (err) {
                    console.log('2');
                    this._handleErr(err, res);
                    return;
                }

                ownedVehicle.save((err) => {
                    if (err) {
                        console.log('3');
                        TripsModel.findOneAndRemove({_id: created._id}, (err) => {
                            if (err) {
                                console.log('4');
                                console.log(err);
                            }
                        });
                        this._handleErr(err, res);
                        return;
                    }

                    res.sendStatus(200);
                    console.log('added Fillup');
                });
            });
        });
    }

    _handleErr(err, res) {
        console.log(err);
        res.sendStatus(500);
    }
}

export default VehicleDetail;
