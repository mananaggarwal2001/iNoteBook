import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';
const AddNotes = () => {
    const notes = useContext(noteContext);
    const { Notes, addNote } = notes;

    const [Note, setNote] = useState({ title: "", description: "", tag: "default" })




    const handleAddNotes = (e) => {
        e.preventDefault();
        addNote(Note.title, Note.description, Note.tag); // this function is made in the NoteState.js file which will be used for adding the notes in the application just we have to call this function and pass the Note as the parameter.
    }

    const onChange = (e) => {
        setNote({ ...Note, [e.target.name]: e.target.value }); // this syntax means that the name value is populated with the value which is supplied in the input feild.

    }
    return (
        <div>
            <div className="container my-5">
                <h1 className='text-center'>Add a Note</h1>
                <form className='my-4'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' onChange={onChange} />
                    </div>
                    <button onClick={handleAddNotes} type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

        </div>
    )
}

export default AddNotes