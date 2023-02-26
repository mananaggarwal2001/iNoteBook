import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';
const AddNotes = () => {
    const notes = useContext(noteContext);
    const { Notes, addNote } = notes;

    const [Note, setNote] = useState({ title: "", description: "", tag: "General" })




    const handleAddNotes = (e) => {
        e.preventDefault();
        addNote(Note.title, Note.description, Note.tag); // this function is made in the NoteState.js file which will be used for adding the notes in the application just we have to call this function and pass the Note as the parameter.
        setNote({ title: "", description: "", tag: "General" })
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
                        <input type="text" className="form-control" id="title" value={Note.title} name='title' aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" value={Note.description} id="description" name='description' onChange={onChange} minLength={10} required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor='tag' className='form-label'>Tag</label>
                        <select class="form-select" id='tag' value={Note.tag} aria-label="Default select example" name='tag' onChange={onChange}>
                            <option selected>General</option>
                            <option value="Sports">Sports</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Technology">Technology</option>
                            <option value="Personal">Personal</option>
                        </select>
                    </div>
                    <button disabled={Note.title.length < 5 || Note.description.length < 10} onClick={handleAddNotes} type="submit" className="btn btn-primary">Add Note</button>
                </form>
            </div>

        </div>
    )
}

export default AddNotes