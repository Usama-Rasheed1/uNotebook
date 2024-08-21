import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const host = "http://localhost:5000"
    const notesInitial = []
      const [notes, setNotes] = useState(notesInitial)

    // Get all Notes
    const getNotes = async ()=>{

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setNotes(json);
      }

      // Add a Note
      const addNote = async (title, description, tag)=>{
        // TODO: API call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();

        const note = json;
        setNotes(notes.concat(note))
      }
      
      // Delete a Note
    const deleteNote = async (id) => {
        // API call to delete the note
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });

        if (response.ok) {  
            
            // Remove the deleted note from the state
            const newNotes = notes.filter(note => note._id !== id);
            setNotes(newNotes);
        } else {
            console.error("Failed to delete the note. Status Code:", response.status);
        }
    };

    // Edit a Note

    const editNote = async (id, title, description, tag) => {
        try {
          // API call to update the note
          const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const json = await response.json();
          console.log(json);
          
      
          // Update the local state with the new note data
          setNotes(notes.map(note =>
            note._id === id ? { ...note, title, description, tag } : note
          ));
        } catch (error) {
          console.error('Error:', error);
        }
      };
      

    return (
        <noteContext.Provider value = {{notes, getNotes, addNote, deleteNote, editNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;