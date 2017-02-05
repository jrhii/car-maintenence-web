import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserVehicleSchema = new Schema({
    userID: {type: Schema.Types.ObjectId, required: true},
    vehicleID: {type: Schema.Types.ObjectId, required: true},
    miles: {type: Number, required: false},
});

export default UserVehicleSchema;
