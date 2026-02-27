import NotesModel from "../models/notesModel.js"


export const createNote = async (req, res) => {
    try {
        const { title, content, isDraft } = req.body;
        const logInUserId = req.user._id; // Login user ki ID middleware se mili
        const response = await NotesModel.create({
            title,
            content,
            isDraft,
            user: logInUserId // **USER ID YAHAN ADD KIYA GAYA**
        })
        res.json({
            status: true,
            data: response
        })
    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}

export const getAllNotes = async(req, res) => {
    try {

        const loggedInUserId = req.user._id; // Login user ki ID
        const response = await NotesModel.find({ user: loggedInUserId }).sort({ date: -1 })

        res.json({
            status: true,
            message: response,
            data : response
        })

    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}

export const updateNote = async (req, res) => {
    try {
        const noteId = req.params.id; 
        const loggedInUserId = req.user._id; 
        const updateData = req.body; 
// console.log(noteId);
// console.log(loggedInUserId);
// console.log(updateData);

        
        const updatedNote = await NotesModel.findOneAndUpdate(
            { _id: noteId, user: loggedInUserId },updateData,{ new: true });

        if (!updatedNote) {
            return res.status(404).json({
                status: false,
                message: "Note not found or user is not the owner."
            });
        }

        res.json({
            status: true,
            message: "Note updated successfully",
            data: updatedNote
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message || "Failed to update note"
        });
    }
}

export const deleteNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        const loggedInUserId = req.user._id; 

       
        const deletedNote = await NotesModel.findOneAndDelete({
            _id: noteId, 
            user: loggedInUserId
        });

        if (!deletedNote) {
            return res.status(404).json({
                status: false,
                message: "Note not found or user is not the owner."
            });
        }

        res.json({
            status: true,
            message: "Note deleted successfully",
            data: deletedNote
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message || "Failed to delete note"
        });
    }
}
