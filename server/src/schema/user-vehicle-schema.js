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
    startMiles: Number,
    lifetimeUpdates: {type: [{
        date: {type: Date, default: Date.now},
        miles: Number,
        gallons: Number,
        cost: Number,
    }], default: lifeTimeUpdate},
    trips: {type: [{
        date: {type: Date, default: Date.now},
        miles: Number,
        tripMiles: Number,
        gallons: Number,
        cost: Number,
    }]},
    startMileage: {type: Number, default: -1},
});

export default UserVehicleSchema;
