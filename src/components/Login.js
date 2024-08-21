import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {

    const [cred, setCred] = useState({email: "", password: ""})
    let navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault(); 
        const host = "http://localhost:5000"
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: cred.email, password: cred.password})
        });
        const json = await response.json()

        if(json.success){
            //redirect
            localStorage.setItem('token', json.authToken);
            // console.log(localStorage.getItem('token'));
            
            props.showAlert("Logged In Successfully ", "success")
            navigate("/");
        }
        else{
            props.showAlert("Invalid Details", "danger")
        }
    }
    const onChange = (e) => {
        setCred({
          ...cred,
          [e.target.name]: e.target.value
        });
    };
  return (
    <div className='container mt-4'>
        <h1 className='text-primary'><strong>Welcome Back</strong></h1>
        <h2 className='mb-4'>Login to continue with <i>uNotebook</i></h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group mt-4 mb-3">
                <label htmlFor="Email">Email address</label>
                <input type="email" value={cred.email} autoComplete="email" onChange={onChange} className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                <small id="emailHelp" className="form-text text-muted">Make sure to add a valid email address.</small>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" value={cred.password} autoComplete="new-password" onChange={onChange} className="form-control" id="password" name="password" placeholder="Password"/>
            </div>
            <button type="submit" className="btn btn-primary mt-4">Login</button>
        </form>
    </div>
  )
}

export default Login