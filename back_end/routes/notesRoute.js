import express from "express";
import {createNote, deleteNote, getAllNotes, updateNote} from "../controller/notesController.js"
import checkAuth from "../middlewares/authMiddleware.js"
const router = express.Router();


router.route('/notes').post(checkAuth,createNote).get(checkAuth,getAllNotes)

router.route('/notes/:id').put(checkAuth,updateNote).delete(checkAuth, deleteNote) 
   
    

export default router;