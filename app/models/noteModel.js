import mongoose, { Schema, model } from "mongoose";

const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    }
}, {timestamps: true});

const NoteModel = mongoose.models.Note || mongoose.model("Note", noteSchema);

export default NoteModel;