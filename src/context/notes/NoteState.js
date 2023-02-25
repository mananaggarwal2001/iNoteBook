import React from "react";
import noteContext from "./noteContext";
import { useState } from "react";

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
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmNzUxYjhkMGUyZDVmZTgzYjA0N2Q5In0sImlhdCI6MTY3NzE1NTQwNX0.NAkgaoEAg5xLm_IiEbIlnLUzi9sJ8KKAonK6L3xMKZ0',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const newReponse = await response.json();
        console.log(newReponse)
        setNotes(newReponse)
    }

    // Add a note
    const addNote = async (title, description, tag) => {
        // TODO :- api call to be made for adding the note.
        const response = await fetch(`${host}/api/notes/addNotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmNzUxYjhkMGUyZDVmZTgzYjA0N2Q5In0sImlhdCI6MTY3NzE1NTQwNX0.NAkgaoEAg5xLm_IiEbIlnLUzi9sJ8KKAonK6L3xMKZ0',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ title, description, tag })
        });
        const newReponse = await response.json();
        console.log(newReponse);

        // Logic to add Note in client
        const note = {
            "_id": "63f8a07d2177c81d0a1dd173",
            "user": "63f751b8d0e2d5fe83b047d9",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-02-24T11:33:17.491Z",
            "__v": 0
        };
        setNotes(Notes.concat(note)) // note is being added using the push method.
    }
    // delete the note
    const deleteNote = async (id) => {
        await fetch(`${host}/api/notes/deleteNote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmNzUxYjhkMGUyZDVmZTgzYjA0N2Q5In0sImlhdCI6MTY3NzE1NTQwNX0.NAkgaoEAg5xLm_IiEbIlnLUzi9sJ8KKAonK6L3xMKZ0',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        // Logic to deleteNote in client
        console.log("Deleting the note with the id which is :- " + id)
        const newNotes = Notes.filter((note) => {
            return (note._id !== id);
        })
        setNotes(newNotes);
    }
    // edit  the note
    const editNote = async (id, title, description, tag) => {
        // TODO in the backend  for editing the note.
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmNzUxYjhkMGUyZDVmZTgzYjA0N2Q5In0sImlhdCI6MTY3NzE1NTQwNX0.NAkgaoEAg5xLm_IiEbIlnLUzi9sJ8KKAonK6L3xMKZ0',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, tag })
        });
        const newReponse = await response.json();
        console.log(newReponse);
        // Logic to editing the note in client side.
        Notes.forEach((element) => {
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag
            }
        })

    }
    const [Notes, setNotes] = useState(notesintial)
    return (
        <noteContext.Provider value={{ Notes, addNote, deleteNote, editNote, getAllNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;