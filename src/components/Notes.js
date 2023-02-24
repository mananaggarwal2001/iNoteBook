import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import AddNotes from './AddNotes';
import Noteitem from './Noteitem';
const Notes = () => {
    const notes = useContext(noteContext);
    const { Notes, AddNote } = notes;
    return (
        <>
            <AddNotes />
            <h1 className='text-center'>Your Notes</h1>
            <div className="row">
                {Notes.map((element) => {
                    return <Noteitem key={element._id} note={element} />
                })}
            </div>

        </>
    )
}

export default Notes