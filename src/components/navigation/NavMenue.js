import './NavMenue.css'
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';

export default function NavMenue() {

   const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
   console.log(isLoggedIn)
   console.log(user)
   
   return (
      <nav id="nav-menue">
        <NavLink to="/feed" className="menue-icon-container"><i className="fa-solid fa-house menue-icon"></i></NavLink>
        <NavLink to="/profile" className="menue-icon-container"><i className="fa-solid fa-user menue-icon"></i></NavLink>
        <NavLink to="/chat" className="menue-icon-container"><i className="fa-solid fa-comments menue-icon"></i></NavLink>
        {isLoggedIn && <button className="icon-button" onClick={() => logOutUser()}>
         <i className="fa-solid fa-right-from-bracket menue-icon"></i>
        </button>}
         <div className="curved corner-b-left b-left-grey"></div>
      </nav>
   )
}