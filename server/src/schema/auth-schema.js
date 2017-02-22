import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AuthSchema = new Schema({
    username: { type: String, required: true, lowercase: true},
    ITERATION: { type: Number, required: true},
    salt: { type: String, require: true },
    hashed: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
});

export default AuthSchema;
