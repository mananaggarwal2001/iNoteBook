import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import AddNotes from './AddNotes';
import Noteitem from './Noteitem';
const Notes = () => {
    const notes = useContext(noteContext);
    const { Notes, AddNote, getAllNotes } = notes;

    useEffect(() => {
        getAllNotes()
    }, [])
    const ref = useRef(null)
    const updateNote = (note) => {
        ref.current.click()
    } // this is the update note functionality which will show the boostrap model for updaing the notes in the given note application
    const [Note, setNote] = useState({ etitle: "", edescription: "", etag: "General" })
    const onChange = (e) => {
        setNote({ ...Note, [e.target.name]: e.target.value }); // this syntax means that the name value is populated with the value which is supplied in the input feild.

    }
    return (
        <>
            <AddNotes />
            <button ref={ref} type="button" class="btn btn-primary hiding" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ display: 'none' }}>
                Launch demo modal
            </button>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form className='my-4'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" onChange={onChange} important />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' onChange={onChange} important />
                                </div>
                                <div className="mb-5">
                                    <label htmlFor='etag' className='form-label'>Tag</label>
                                    <select class="form-select" id='etag' aria-label="Default select example" name='etag' onChange={onChange}>
                                        <option selected>General</option>
                                        <option value="Sports">Sports</option>
                                        <option value="Entertainment">Entertainment</option>
                                        <option value="Technology">Technology</option>
                                        <option value="Personal">Personal</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className='text-center'>Your Notes</h1>
            <div className="row">
                {Notes.map((element) => {
                    return <Noteitem key={element._id} updateNote={updateNote} note={element} />
                })}
            </div>

        </>
    )
}

export default Notes