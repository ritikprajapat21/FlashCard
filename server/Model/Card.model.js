import mongoose from "mongoose";

const CardSchema = mongoose.Schema({
    createdBy: {
        type: String,
        required: true
    },
    front: {
        type: String,
        required: true
    },
    back: {
        type: String,
        required: true
    },
    share: Boolean
});

export default mongoose.model.Cards || mongoose.model('Card', CardSchema);