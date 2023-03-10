import React from "react";
import noteContext from "./noteContext";
import { useState } from "react";
import Swal from "sweetalert2";

const NoteState = (props) => {
    // syntax for using the context API which is made in the noteContext.js file we are using in this NoteState.js file .
    const host = "http://localhost:5000";
    const notesintial = []
    const getAllNotes = async () => {
        // TODO :- api call to be made for adding the note.
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const newReponse = await response.json();
        setNotes(newReponse)
        return newReponse;
    }

    // Add a note
    const addNote = async (title, description, tag) => {
        // TODO :- api call to be made for adding the note.
        const response = await fetch(`${host}/api/notes/addNotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const newNote = {
            title: title,
            description: description,
            tag: tag
        }
        setNotes(Notes.concat(newNote)) // note is being added using the push method.
        // Logic to add Note in client
    }
    // delete the note
    const deleteNote = async (id) => {

        const response = await Swal.fire({
            icon: 'question',
            text: "Are you Sure want to delete this Note",
            confirmButtonColor: 'green',
            confirmButtonText: 'Delete Note',
            cancelButtonColor: 'red',
            cancelButtonText: 'Cancel',
            showCancelButton:true
            // showCancelButton:false,
            // showConfirmButton:false,
            // showCloseButton:false,
            // showDenyButton:false
        });

        if (response.isConfirmed) {

            Swal.fire({
                showCancelButton: false,
                showConfirmButton: false,
                showCloseButton: false,
                showDenyButton: false,
                icon: 'success',
                text: 'Notes has Been deleted',
                timer: 1000
            })
            await fetch(`${host}/api/notes/deleteNote/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
            });


            // Logic to deleteNote in client
            console.log("Deleting the note with the id which is :- " + id)
            const newNotes = Notes.filter((note) => {
                return (note._id !== id);
            })
            setNotes(newNotes);
        } else {
            Swal.fire({
                showCancelButton: false,
                showConfirmButton: false,
                showCloseButton: false,
                showDenyButton: false,
                icon: 'error',
                text: 'Note is not Deleted',
                timer: 1000
            });
        }
    }
    // edit  the note
    const editNote = async (id, title, description, tag) => {
        // TODO in the backend  for editing the note.
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, tag })
        });
        const newReponse = await response.json();
        console.log(newReponse);
        // In the react js the state doesn't update directly in the react what we will do is to :-
        let newNotes = JSON.parse(JSON.stringify(Notes)); // this will create the copy of the new Notes which is updated in the backend in the variable newNotes.
        // Logic to editing the note in client side.
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (id === Notes[index]._id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }

        }
        setNotes(newNotes)

    }
    const [Notes, setNotes] = useState(notesintial)
    return (
        <noteContext.Provider value={{ Notes, addNote, deleteNote, editNote, getAllNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;