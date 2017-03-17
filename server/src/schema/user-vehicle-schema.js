import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const lifeTimeUpdate = [{
    date: Date.now,
    miles: 0,
    gallons: 0,
    cost: 0,
}];

const UserVehicleSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, required: true},
    vehicleId: {type: Schema.Types.ObjectId, required: true},
    startMiles: {type: Number, default: -1, required: true},
    startGallons: {type: Number, default: 0, required: true},
    startCost: {type: Number, default: 0, required: true},
    latestUpdate: {type: Date, default: Date.now, required: true},
    totalMiles: {type: Number, default: 0, required: true},
    totalGallons: {type: Number, default: 0, required: true},
    totalCost: {type: Number, default: 0, required: true},
});

export default UserVehicleSchema;
