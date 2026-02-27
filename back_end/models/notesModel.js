import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  content: {
    type: String,
  },
  isDraft: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user', 
    required: true
  }
});

const NotesModel = mongoose.model('Note', noteSchema);

export default NotesModel;

