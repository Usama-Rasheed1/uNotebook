import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';

const Addnote = () => {
  const context = useContext(noteContext);
  const {addNote} = context;

  const [note, setNote] = useState({title:"", description:"", tag:""})

  const handleClick = (e)=>{
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  }

  const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})

  }

  return (
    <div className='container my-4'>
        <h2>Add a Note</h2>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="desc">Description</label>
            <input type="text" className="form-control" id="description" name="description" onChange={onChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="tag">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" onChange={onChange}/>
          </div>
          <button type="submit" className="btn btn-primary mt-2" onClick={handleClick}>Add Note</button>
        </form>
      </div>
  )
}

export default Addnote