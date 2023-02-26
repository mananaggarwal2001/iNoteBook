import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import Alert from './Alert';
const Noteitem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote}= context;
    const { note, updateNote } = props;
    return (
        <div className="col-sm-4 mb-3 mb-sm-0 my-5">
            <div className="card">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h5 className="card-title text-center">{note.title}</h5>
                        <div>
                            <i className="fa-sharp fa-solid fa-trash mx-2" data-toggle="tooltip" data-placement="top" title="Delete The Note" onClick={()=>{deleteNote(note._id)}}></i>
                            <i className="fa-solid fa-pen-to-square mx-2" data-toggle="tooltip" data-placement="top" onClick={()=>updateNote(note)} title="Edit the Note"></i>
                        </div>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem