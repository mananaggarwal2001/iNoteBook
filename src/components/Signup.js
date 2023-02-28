import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Alert from './Alert';
function Signup() {
    const navigate = useNavigate()
    const [RegisterCredentials, setRegisterCredentials] = useState({ name: "", userName: "", email: "", password: "", repeatPassword: "" });
    const onChange = (e) => {
        setRegisterCredentials({ ...RegisterCredentials, [e.target.name]: e.target.value });
    }

    const handleRegisterForm = async (e) => {
        e.preventDefault()
        if (RegisterCredentials.password === RegisterCredentials.repeatPassword) {

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
                Alert('success', 'Account Created Successfully')
            } else {
                Alert('error', 'Account Already Exists.')
            }
        } else {
            Alert('error', "Passwords and Repeat Password Doesn't match. Please Try Again !!!!!");
        }
    }
    return (
        <div className="wrapper">
            <div className="logo">
                <img src="https://png.pngtree.com/png-vector/20210511/ourlarge/pngtree-notebook-business-writing-books-png-image_3265895.jpg" alt="" />
            </div>
            <div className="text-center mt-4 name">
                Sign Up
            </div>
            <form className="p-3 mt-3" onSubmit={handleRegisterForm}>
                <div className="form-field d-flex align-items-center">
                    <span className="far fa-user"></span>
                    <input type="text" value={RegisterCredentials.name} name="name" id="userName" placeholder="Name" onChange={onChange} required />
                </div>
                <div className="form-field d-flex align-items-center">
                    <span className="far fa-user"></span>
                    <input type="text" value={RegisterCredentials.userName} name="userName" id="userName" placeholder="Username" onChange={onChange} required />
                </div>
                <div className="form-field d-flex align-items-center">
                    <span className="far fa-solid fa-envelope"></span>
                    <input type="email" value={RegisterCredentials.email} name="email" id="email" placeholder="Email" onChange={onChange} required />
                </div>
                <div className="form-field d-flex align-items-center">
                    <span className="fas fa-key"></span>
                    <input type="password" value={RegisterCredentials.password} name="password" id="pwd" placeholder="Password" onChange={onChange} minLength={5} required />
                </div>
                <div className="form-field d-flex align-items-center">
                    <span className="fas fa-key"></span>
                    <input type="password" value={RegisterCredentials.repeatPassword} name="repeatPassword" id="pwd" placeholder="Repeat Password" onChange={onChange} minLength={5} required />
                </div>
                <button className="btn mt-3">Sign Up</button>
            </form>
            <div className="text-center fs-6">
                <p className='text-center'>if you already have an account then </p><Link to="/login" style={{ fontSize: '15px' }}>Login</Link>
            </div>
        </div>
    )
}

export default Signup
