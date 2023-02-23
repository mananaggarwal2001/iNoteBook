const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { route } = require('./auth');


// Route 1:- get all the notes using this api which is :- /api/notes/fetchallnotes
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    // for fetching all the notes for the particular user which is :-
    try {

        const allNotes = await Notes.find({ user: req.user.id });
        res.json(allNotes);
    } catch (error) {
        console.log(error.message())
        res.status(500).json({ error: "Internal Server Error" })
    }
})

// Router 2:- Add the notes according to the particular user using the endpoint which is :-

// API NOTES:- /api/notes/addNotes.
router.post('/addNotes', fetchuser, [
    body('title', 'Enter the valid Title').isLength({ min: 3 }),
    body('description', 'Enter the valid Description').isLength({ min: 10 })
], async (req, res) => {
    const resultValidation = validationResult(req);

    // If there are errors while not fulfilling the demand of the notes then directly we will declare it as the bad request.

    if (!resultValidation.isEmpty()) {
        return res.status(400).json({ errors: resultValidation.Array() })
    }

    try {

        const { title, description, tag } = req.body;
        const note = new Notes({ // 2nd way to create the note in the notes tag.
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        console.log(savedNote)
        res.json({ savedNote });
        // if the error in the server will come then it will drop to the catch block and show the real reason for the error.
    } catch (error) {
        console.log(error.message())
        res.status(500).json({ error: "internal server error" })
    }

})

// Route No:- 3 Update the Exsiting Note in the given notes using the endpoint /api/notes/updatenote

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    // create the newNote Object i will create for updating the note.
    const newNote = {} // with this the object of the new note will created for doing the editing of the existing note.
    if (title) { newNote.title = title };
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag };


    // find the note to be updated and update it.
    const Note = await Notes.findById(req.params.id);
    if (!Note) {
        return res.status(400).send("Not Found")
    }
    if (Note.user.toString() !== req.user.id) {
        return res.status(404).send("Not Found")
    }

    // Security code work is done now we can update the given note safely with the mongoose function which is findbyidandupdate.

    const updatedNote = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true }) // this  will update the existing note to the newNote and we are done with the updating note.
    console.log(updatedNote)
    res.json({ updatedNote })

})

// Route No :- 4 Delete the Note using the end point :- /api/notes/deleteNote

router.delete('/deleteNote/:id', fetchuser, async (req, res) => {

    try {

        const NotetoDelete = await Notes.findById(req.params.id)
        if (!NotetoDelete) {
            return res.status(404).json({ error: "Not Found" })
        }

        // to check whether the notes are by that particular user or not if not we will show the unauthorized error and if not we will proceed by the further process of deletion and same goes for the updation of the note also.
        
        if (NotetoDelete.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorized Access")
        }

        const realNoteToDelete = await Notes.findByIdAndDelete(req.params.id)
        res.json({ realNoteToDelete })
    } catch (error) {
        res.send(500).json({ error: "Internal Server Error" })
        console.log(error.message())
    }

    // find the note to be updated and delete the given note of the given particular id.

})


module.exports = router;