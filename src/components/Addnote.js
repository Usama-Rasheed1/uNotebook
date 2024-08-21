import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';

const Addnote = (props) => {
  const context = useContext(noteContext);
  const {addNote} = context;

  const [note, setNote] = useState({title:"", description:"", tag:""})

  const handleClick = (e)=>{
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title:"", description:"", tag:""})
    props.showAlert("Note Added Successfully", "success")
  }

  const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})

  }

  return (
    <div className='container my-4'>
        <h2 style={{marginTop: '60px'}}>Add a Note</h2>
        <form>
          <div className="form-group mt-2">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" value={note.title} id="title" name="title" aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
          </div>
          <div className="form-group mt-2">
            <label htmlFor="desc">Description</label>
            <input type="text" className="form-control" value={note.description} id="description" name="description" onChange={onChange} minLength={5} required/>
          </div>
          <div className="form-group mt-2">
            <label htmlFor="tag">Tag</label>
            <input type="text" className="form-control" value={note.tag} id="tag" name="tag" onChange={onChange}/>
          </div>
          <button disabled={note.title.length<5 || note.description.length < 5} type="submit" className="btn btn-primary mt-3" onClick={handleClick}>Add Note</button>
        </form>
      </div>
  )
}

export default Addnote