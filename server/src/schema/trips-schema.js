import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TripsSchema = new Schema({
    date: {type: Date, default: Date.now, required: true},
    miles: {type: Number, required: true},
    tripMiles: {type: Number, required: true},
    gallons: {type: Number, required: true},
    cost: {type: Number, required: true},
});

export default TripsSchema;
