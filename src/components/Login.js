import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

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
        console.log(json);

        if(json.success){
            //redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/")

        }
        else{
            alert("Invalid Alert");
        }
    }
    const onChange = (e) => {
        setCred({
          ...cred,
          [e.target.name]: e.target.value
        });
      };
  return (
    <form onSubmit={handleSubmit}>
    <div className="form-group">
        <label htmlFor="Email">Email address</label>
        <input type="email" value={cred.email} onChange={onChange} className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email"/>
        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" value={cred.password} onChange={onChange} className="form-control" id="password" name="password" placeholder="Password"/>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default Login