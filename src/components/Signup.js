import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {

    const [cred, setCred] = useState({name: "", email: "", password: "", cpassword: ""})
    let navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {name, email, password} = cred 
        const host = "http://localhost:5000"
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await response.json()
        console.log(json);

        if(json.success){
            //redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            props.showAlert("Account Created Successfully ", "success")
        }
        else{
            props.showAlert("Invalid Credentials", "danger")
        }
    }
    const onChange = (e) => {
        setCred({
          ...cred,
          [e.target.name]: e.target.value
        });
    };

   
  return (
    <div className='container'>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">your Name</label>
                <input type="text" className="form-control" id="name" name="name" onChange={onChange} placeholder="Enter name" minLength={3} required/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" required/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" name="password" onChange={onChange} placeholder="Password" minLength={5} required/>
            </div>
            <div className="form-group">
                <label htmlFor="cpassword">Confirm Password</label>
                <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} placeholder="Password" minLength={5} required/>
            </div>

            <button type="submit" className="btn btn-primary mt-3">Submit</button>
        </form>
    </div>
  )
}

export default Signup