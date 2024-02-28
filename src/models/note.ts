// models/NoteModel.js
import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

// const NoteModel = mongoose.model('Note', noteSchema);

// export default NoteModel;
export default  mongoose.models.Note || mongoose.model("Note", noteSchema) ;