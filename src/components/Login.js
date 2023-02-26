import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from './Alert';
function Login() {

    const [Credentials, setCredentials] = useState({ Email: "", Password: "" })

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: Credentials.Email, password: Credentials.Password })
        })

        const responsejosn = await response.json()
        if (responsejosn.success) {
            localStorage.setItem('token', responsejosn.authToken)
            navigate('/');
            Alert('success', 'Login Successfull')
        } else {
            Alert('error', 'Invalid Credentials')
        }
        console.log(responsejosn)
    }
    const onChange = (e) => {
        setCredentials({ ...Credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="wrapper">
                <div className="logo">
                    <img src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png" alt="" />
                </div>
                <div className="text-center mt-4 name">
                    Login
                </div>
                <form className="p-3 mt-3" onSubmit={handleSubmit}>
                    <div className="form-field d-flex align-items-center">
                        <span className="far fa-user"></span>
                        <input type="email" value={Credentials.Email} name="Email" id="email" placeholder="Email" onChange={onChange} required />
                    </div>
                    <div className="form-field d-flex align-items-center">
                        <span className="fas fa-key"></span>
                        <input type="password" value={Credentials.Password} name="Password" id="password" placeholder="Password" onChange={onChange} required />
                    </div>
                    <button type='submit' className="btn mt-3">Login</button>
                </form>
                <div className="text-center fs-6">
                    <p className='text-center'>if you don't have a account then</p><a href="#" style={{ fontSize: '15px' }}>Sign up</a>
                </div>
            </div>
        </>
    )
}

export default Login
