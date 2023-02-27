import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
function Navbar() {
    let location = useLocation();
    let navigate = useNavigate()
    const handleLogoutFunction = (e) => {
        e.preventDefault()
        console.log(localStorage.getItem('token'))
        localStorage.removeItem('token')
        console.log(localStorage.getItem('token'))
        navigate('/login')
    }
    const [nameStatechange, setnameStatechange] = useState("")
    return (
        <nav className="navbar navbar-expand-lg navbar-dark  bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/home">iNoteBook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    <span className='navbar-text mx-2 text-lg-start' style={{fontSize:'18px'}}>Username {nameStatechange}</span>
                    {!localStorage.getItem('token') ? <form action="" className="d-flex">
                        <Link className="btn btn-primary" to='/login'>Login</Link>
                        <Link className="btn btn-primary mx-3" to='/signup'>Sign Up</Link>
                    </form> : <button onClick={handleLogoutFunction} className='btn btn-primary'>Logout</button>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
