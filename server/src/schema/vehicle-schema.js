import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
    year: {type: Number, required: true},
    make: {type: String, required: true},
    model: {type: String, required: true},
    opt: {type: String, required: false},
});

export default VehicleSchema;
