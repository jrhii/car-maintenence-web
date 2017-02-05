import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AuthSchema = new Schema({
    username: { type: String, required: true, lowercase: true},
    ITERATION: { type: Number, required: true},
    salt: { type: Schema.Types.Mixed, require: true },
    hashed: { type: String, required: true },
});

export default AuthSchema;
