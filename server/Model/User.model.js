import mongoose from "mongoose";

const UserModel = mongoose.Schema({
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