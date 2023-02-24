import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
const Notes = () => {
    const notes = useContext(noteContext);
    const { Notes, setNotes } = notes;
    return (
        <>
            <h1 className='text-center'>Your Notes</h1>
            <div className="row">
                {Notes.map((element) => {
                    return <Noteitem note={element} />
                })}
            </div>

        </>
    )
}

export default Notes