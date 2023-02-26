import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import AddNotes from './AddNotes';
import Noteitem from './Noteitem';
const Notes = () => {
    const notes = useContext(noteContext);
    const { Notes, AddNote, getAllNotes, editNote } = notes;

    useEffect(() => {
        getAllNotes()
    }, [])
    const ref = useRef(null)
    const closeref = useRef(null)
    const [Note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const updateNote = (Currentnote) => {
        ref.current.click()
        setNote({ id: Currentnote._id, etitle: Currentnote.title, edescription: Currentnote.description, etag: Currentnote.tag })
    } // this is the update note functionality which will show the boostrap model for updaing the notes in the given note application
    const onChange = (e) => {
        setNote({ ...Note, [e.target.name]: e.target.value }); // this syntax means that the name value is populated with the value which is supplied in the input feild.

    }

    const handleUpdateNote = (e) => {
        e.preventDefault();
        console.log("Updating the note in the given console which is the way to update the note")
        editNote(Note.id, Note.etitle, Note.edescription, Note.etag)
        closeref.current.click() // for closing the modal we will use this function
    }
    // the launch demo modal button is used for acivating the modal class which is referenced by the icon which is in the note button.
    return (
        <>
            <AddNotes />
            <button ref={ref} type="button" class="btn btn-primary hiding" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ display: 'none' }}>
                Launch demo modal
            </button>
            <div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form className='my-4'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" onChange={onChange} value={Note.etitle} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" value={Note.edescription} className="form-control" id="edescription" name='edescription' onChange={onChange} minLength={10} required />
                                </div>
                                <div className="mb-5">
                                    <label htmlFor='etag' className='form-label'>Tag</label>
                                    <select value={Note.etag} class="form-select" id='etag' aria-label="Default select example" name='etag' onChange={onChange}>
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
                            <button ref={closeref} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={Note.edescription.length < 10 || Note.etitle.length < 5} onClick={handleUpdateNote} type="button" class="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className='text-center'>Your Notes</h1>
            <div className="row">
                <div className='text-center container' style={{ fontWeight: 'bold', fontSize: '20px', fontFamily: 'cursive' }}>{Notes.length === 0 && 'No Notes To Display'}</div>
                {Notes.map((element) => {
                    return <Noteitem key= {element.id} updateNote={updateNote} note={element} />
                })}
            </div>

        </>
    )
}

export default Notes