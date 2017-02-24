import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true, lowercase: true},
    ownedIds: {type: [Schema.Types.ObjectId], required: false},
    isAdmin: {type: Boolean, default: false, required: true},
});

export default UserSchema;
