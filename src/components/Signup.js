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
            props.showAlert("Account Created Successfully ", "success")
            navigate("/login");
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
    <div className='container mt-2'>
        <h1 className='text-primary'><strong>Welcome To uNotebook</strong></h1>
        <h2 className='mb-4'>Create a new account with <i>uNotebook</i></h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-2">
                <label htmlFor="name">Your Name</label>
                <input type="text" className="form-control" autoComplete="name" id="name" name="name" onChange={onChange} placeholder="Enter name" minLength={3} required/>
            </div>
            <div className="form-group mb-2">
                <label htmlFor="email">Email Address</label>
                <input type="email" className="form-control" autoComplete="email" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" required/>
                <small id="emailHelp" className="form-text text-muted">Make sure to add a valid email address.</small>
            </div>
            <div className="form-group mb-2">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" autoComplete="new-password" id="password" name="password" onChange={onChange} placeholder="Password" minLength={5} required/>
            </div>
            <div className="form-group">
                <label htmlFor="cpassword">Confirm Password</label>
                <input type="password" className="form-control" autoComplete="new-password" id="cpassword" name="cpassword" onChange={onChange} placeholder="Password" minLength={5} required/>
            </div>

            <button type="submit" className="btn btn-primary mt-4">Create Account</button>
        </form>
    </div>
  )
}

export default Signup