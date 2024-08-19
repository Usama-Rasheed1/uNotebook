import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{

    const notesInitial = [
        {
          "_id": "66c392251014940d4105489d",
          "user": "66bebaf36ae379a9d5194c97",
          "title": "My title",
          "description": "Please",
          "tag": "private",
          "date": "2024-08-19T18:42:45.044Z",
          "__v": 0
        },
        {
          "_id": "66c392351014940d410548a0",
          "user": "66bebaf36ae379a9d5194c97",
          "title": "My title 2",
          "description": "Please 2",
          "tag": "private2",
          "date": "2024-08-19T18:43:01.047Z",
          "__v": 0
        },
        {
          "_id": "66c392351014940d410548a1",
          "user": "66bebaf36ae379a9d5194c97",
          "title": "My title 3",
          "description": "Please 3",
          "tag": "private2",
          "date": "2024-08-19T18:43:01.047Z",
          "__v": 0
        },
        {
          "_id": "66c392351014940d410548a2",
          "user": "66bebaf36ae379a9d5194c97",
          "title": "My title 4",
          "description": "Please 4",
          "tag": "private2",
          "date": "2024-08-19T18:43:01.047Z",
          "__v": 0
        },
        {
          "_id": "66c392351014940d410548a3",
          "user": "66bebaf36ae379a9d5194c97",
          "title": "My title 5",
          "description": "Please 5",
          "tag": "private2",
          "date": "2024-08-19T18:43:01.047Z",
          "__v": 0
        }
      ]

      const [notes, setNotes] = useState(notesInitial)

    return (
        <noteContext.Provider value = {{notes, setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;