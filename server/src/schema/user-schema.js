import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true, lowercase: true},
    vehicleIds: {type: [Schema.Types.ObjectId], required: true},
});

export default UserSchema;
