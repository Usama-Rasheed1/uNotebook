import React, {useState} from 'react'

export default function TextForm(props){
    const[text, SetText]=useState("");
    const handleUpClick= () => {
        //console.log('OnClick is envoked.');
        let newText=text.toUpperCase();
        SetText(newText);
        props.showAlert('Converted to Uppercase', 'success');
    }
    const handleLoClick= () => {
        //console.log('OnClick is envoked.');
        let newText=text.toLowerCase();
        SetText(newText);
        props.showAlert('Converted to Lowercase', 'success');
    }

    const handleOnChange=(event) => {
        //console.log('OnChange is invoked.');
        SetText(event.target.value);
    }

    const handleClear=() => {
        let newText="";
        SetText(newText);
    }

    return(
        <>
            <div className="container my-3" style={{color: props.mode==='light'? 'black':'white'}}>
                <h1>{props.heading}</h1>
                <textarea className="form-control" value={text} onChange={handleOnChange} style={{color: props.mode==='light'? 'black':'white', backgroundColor: props.mode==='light'? 'white': '#2c2c2c',}} id="exampleFormControlTextarea1" rows="8"></textarea>
                <button className='btn btn-primary my-2 mx-2' onClick={handleUpClick}>Convert toUpperCase</button>
                <button className='btn btn-primary my-2 mx-2' onClick={handleLoClick}>Convert toLowerCase</button>
                <button className='btn btn-primary my-2 mx-2' onClick={handleClear}>Clear</button>
            </div>

            <div className="container my-2" style={{color: props.mode==='light'? 'black':'white'}}>
                <h2>Text Summary</h2>
                <p>{text.split(" ").filter((element)=>{return element.length!==0}).length} words and {text.length} characters.</p>
                <p>Time to read: {text.split(" ").length*0.008} minutes</p>
                <h2>Preview</h2>
                <p>{text.length>0?text : "Enter text to Preview"}</p>

            </div>

        </>
    )
} 