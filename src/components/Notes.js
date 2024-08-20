import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  
  
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);
  
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ id: "", title: "", description: "", tag: "" });

  const updateNote = (currentNote) => {
    ref.current.click(); // Trigger modal programmatically
    setNote({
      id: currentNote._id,
      title: currentNote.title,
      description: currentNote.description,
      tag: currentNote.tag
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.title, note.description, note.tag);
    refClose.current.click(); // Close modal after updating
    props.showAlert("Updated Successfully", "success")
  };

  const onChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Addnote showAlert={props.showAlert}/>

      <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="close" data-bs-dismiss="modal" ref={refClose} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="etitle">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="title"
                    value={note.title}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="description"
                    value={note.description}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="tag"
                    value={note.tag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.title.length<5 || note.description.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className='row my-4'>
        <h2>Your Notes</h2>
        <div className="container mx-2 my-2">
        {notes.length===0 && 'No Notes to display'}
        </div>
        {notes.map((note) => (
          <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
        ))}
      </div>
    </>
  );
};

export default Notes;
