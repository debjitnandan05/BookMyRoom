import React, { useContext } from 'react'
import "./navbar.css"
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import {faUser} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Navbar = () => {
  const {user} = useContext(AuthContext);
  return (
    <div className="navbar">
    <div className="navContainer">
      <Link  to='/' style={{color:"white",textDecoration:"none"}}>
      <span className="logo">BookMyRoom</span>
      </Link>
      {user ? (
      <div className="navUser">
        <FontAwesomeIcon icon={faUser}/> {user.name}
      </div>      
      ) : (
          <div className="navItems">
            <button className="navButton"><NavLink to='/register' style={{ color: "inherit", textDecoration: "none" }}>
              Sign Up
              </NavLink>
            </button>
            <button className="navButton">
              <NavLink to='/login' style={{ color: "inherit", textDecoration: "none" }}>
              Login
              </NavLink>              
              </button>
          </div>
        )}
    </div>
  </div>
  )
}

export default Navbar
