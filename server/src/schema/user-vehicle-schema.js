import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserVehicleSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, required: true},
    vehicleId: {type: Schema.Types.ObjectId, required: true},
    miles: {type: Number, required: false},
});

export default UserVehicleSchema;
