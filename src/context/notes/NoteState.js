import React from "react";
import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    // syntax for using the context API which is made in the noteContext.js file we are using in this NoteState.js file .


    const notesintial = [
        {
            "_id": "63f8a0792177c81d0a1dd169",
            "user": "63f751b8d0e2d5fe83b047d9",
            "title": "Please Access the playList of the code with harry",
            "description": "This is the introduction for the given note",
            "tag": "general",
            "date": "2023-02-24T11:33:13.028Z",
            "__v": 0
        },
        {
            "_id": "63f8a07a2177c81d0a1dd16b",
            "user": "63f751b8d0e2d5fe83b047d9",
            "title": "Please Access the playList of the code with harry",
            "description": "This is the introduction for the given note",
            "tag": "general",
            "date": "2023-02-24T11:33:14.996Z",
            "__v": 0
        },
        {
            "_id": "63f8a07b2177c81d0a1dd16d",
            "user": "63f751b8d0e2d5fe83b047d9",
            "title": "Please Access the playList of the code with harry",
            "description": "This is the introduction for the given note",
            "tag": "general",
            "date": "2023-02-24T11:33:15.875Z",
            "__v": 0
        },
        {
            "_id": "63f8a07c2177c81d0a1dd16f",
            "user": "63f751b8d0e2d5fe83b047d9",
            "title": "Please Access the playList of the code with harry",
            "description": "This is the introduction for the given note",
            "tag": "general",
            "date": "2023-02-24T11:33:16.420Z",
            "__v": 0
        },
        {
            "_id": "63f8a07c2177c81d0a1dd171",
            "user": "63f751b8d0e2d5fe83b047d9",
            "title": "Please Access the playList of the code with harry",
            "description": "This is the introduction for the given note",
            "tag": "general",
            "date": "2023-02-24T11:33:16.974Z",
            "__v": 0
        },
        {
            "_id": "63f8a07d2177c81d0a1dd173",
            "user": "63f751b8d0e2d5fe83b047d9",
            "title": "Please Access the playList of the code with harry",
            "description": "This is the introduction for the given note",
            "tag": "general",
            "date": "2023-02-24T11:33:17.491Z",
            "__v": 0
        }
    ]

    const [Notes, setNotes] = useState(notesintial)
    return (
        <noteContext.Provider value={{Notes, setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;