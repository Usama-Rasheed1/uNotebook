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
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZiZWJhZjM2YWUzNzlhOWQ1MTk0Yzk3In0sImlhdCI6MTcyMzc3OTc5MH0.6lLDcITAyMnI7iQwkLB70169Pz7GfPvyjRhMPZyFlYQ'
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
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZiZWJhZjM2YWUzNzlhOWQ1MTk0Yzk3In0sImlhdCI6MTcyMzc3OTc5MH0.6lLDcITAyMnI7iQwkLB70169Pz7GfPvyjRhMPZyFlYQ'
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json(); 
        console.log(json);

        const note = {
            "_id": "66c392351014940d410548a5",
            "user": "66bebaf36ae379a9d5194c97",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2024-08-19T18:43:01.047Z",
            "__v": 0
          };
        setNotes(notes.concat(note))
      }
      
      // Delete a Note
    const deleteNote = async (id) => {
        // API call to delete the note
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZiZWJhZjM2YWUzNzlhOWQ1MTk0Yzk3In0sImlhdCI6MTcyMzc3OTc5MH0.6lLDcITAyMnI7iQwkLB70169Pz7GfPvyjRhMPZyFlYQ'
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
              'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZiZWJhZjM2YWUzNzlhOWQ1MTk0Yzk3In0sImlhdCI6MTcyMzc3OTc5MH0.6lLDcITAyMnI7iQwkLB70169Pz7GfPvyjRhMPZyFlYQ' // Make sure to replace with a valid token or use a secure method for token management
            },
            body: JSON.stringify({ title, description, tag }) // Pass a single object to JSON.stringify
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