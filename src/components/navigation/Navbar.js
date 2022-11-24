import './Navbar.css'
import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Navbar() {
   const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
   const navigate = useNavigate();
   return (
      <nav id="navbar">
         {user && <p>Hello {user.username}</p>}
         <ul className="navitem-container">
            <li><NavLink className={(element) => element.isActive ? 'navitem-selected' : 'navitem'} to="/">Home</NavLink></li>
            {!isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'navitem-selected' : 'navitem'} to="/signup">Sign up</NavLink></li>}
            {!isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'navitem-selected' : 'navitem'} to="/login">Login</NavLink></li>}
            {isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'navitem-selected' : 'navitem'} to="/private">Private view</NavLink></li>}
            {isLoggedIn && <li><button onClick={() => logOutUser()}>Log out</button></li>}
            <li><button onClick={() => navigate(-1)} className="navbar-button"  >Go back</button></li>
         </ul>
         <div className="curved corner-t-right t-right-grey"></div>
      </nav>
   )
}
 