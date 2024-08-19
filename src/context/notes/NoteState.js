import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props)=>{
    const s1 = {
        "name":"Usama",
        "class":"6"
    }
    const [state, setState] = useState(s1);
    const update = ()=>{
        setTimeout(() => {
            setState({"name":"Ali",
        "class":"10"})
        }, 1000);
    }
    return (
        <noteContext.Provider value = {{state, update}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;