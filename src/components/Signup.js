import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
function Signup() {
    const navigate = useNavigate()
    const [RegisterCredentials, setRegisterCredentials] = useState({ name: "", userName: "", email: "", password: "", repeatPassword: "" });
    const onChange = (e) => {
        setRegisterCredentials({ ...RegisterCredentials, [e.target.name]: e.target.value });
    }

    const handleRegisterForm = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: RegisterCredentials.name, email: RegisterCredentials.email, password: RegisterCredentials.password })
        })
        const json = await response.json()
        console.log(json);
        if (json.success) {
            navigate('/login')
        } else {
            alert("The user is already registered please try again with the different user.")
        }
    }
    return (
        <div className="wrapper">
            <div className="logo">
                <img src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png" alt="" />
            </div>
            <div className="text-center mt-4 name">
                Sign Up
            </div>
            <form className="p-3 mt-3" onSubmit={handleRegisterForm}>
                <div className="form-field d-flex align-items-center">
                    <span className="far fa-user"></span>
                    <input type="text" value={RegisterCredentials.name} name="name" id="userName" placeholder="Name" onChange={onChange} required/>
                </div>
                <div className="form-field d-flex align-items-center">
                    <span className="far fa-user"></span>
                    <input type="text" value={RegisterCredentials.userName} name="userName" id="userName" placeholder="Username" onChange={onChange} required/>
                </div>
                <div className="form-field d-flex align-items-center">
                    <span className="far fa-solid fa-envelope"></span>
                    <input type="email" value={RegisterCredentials.email} name="email" id="email" placeholder="Email" onChange={onChange} required/>
                </div>
                <div className="form-field d-flex align-items-center">
                    <span className="fas fa-key"></span>
                    <input type="password" value={RegisterCredentials.password} name="password" id="pwd" placeholder="Password" onChange={onChange} minLength={5} required/>
                </div>
                <div className="form-field d-flex align-items-center">
                    <span className="fas fa-key"></span>
                    <input type="password" value={RegisterCredentials.repeatPassword} name="repeatPassword" id="pwd" placeholder="Repeat Password" onChange={onChange} minLength={5} required/>
                </div>
                <button className="btn mt-3">Sign Up</button>
            </form>
            <div className="text-center fs-6">
                <p className='text-center'>if you already have an account then </p><a href="#" style={{ fontSize: '15px' }}>Login</a>
            </div>
        </div>
    )
}

export default Signup
