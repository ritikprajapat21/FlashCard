import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    mobile: Number,
    profile: String,
    refreshToken: String,
})

export default mongoose.model.Users || mongoose.model('User', UserSchema)