import mongoose from "mongoose";

const CardSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
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