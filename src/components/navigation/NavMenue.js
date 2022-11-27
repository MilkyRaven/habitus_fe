import './NavMenue.css'
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom'
import homePlacholder from '../../assets/icons/home-placeholder.png'
import { AuthContext } from '../../context/AuthContext';

export default function NavMenue() {

   const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
   console.log(isLoggedIn)
   console.log(user)
   
   return (
      <nav id="nav-menue">
        <NavLink to="/feed" className="menue-icon-container"><img className="menue-icon" src={homePlacholder} alt="feed"/></NavLink>
        <NavLink to="/profile" className="menue-icon-container"><img className="menue-icon" src={homePlacholder} alt="profile"/></NavLink>
        <NavLink to="/chat"className="menue-icon-container"><img className="menue-icon" src={homePlacholder} alt="chat"/></NavLink>
        <NavLink className="menue-icon-container"><img className="menue-icon" src={homePlacholder} alt="chats"/></NavLink>
        {isLoggedIn && <button onClick={() => logOutUser()}>Log out</button>}
         <div className="curved corner-b-left b-left-grey"></div>
      </nav>
   )
}