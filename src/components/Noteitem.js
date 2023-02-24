import React from 'react'

const Noteitem = (props) => {
    const { note } = props;
    return (
        <div className="col-sm-4 mb-3 mb-sm-0 my-5">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title text-center">{note.title}</h5>
                    <p className="card-text">{note.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Id molestiae vitae temporibus mollitia ullam autem cum tenetur placeat voluptate recusandae nemo saepe molestias quas, in quaerat, ducimus qui provident non?</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem