import './NavMenue.css'
import React from 'react'
import { NavLink } from 'react-router-dom'
import homePlacholder from '../../assets/icons/home-placeholder.png'

export default function NavMenue() {
   return (
      <nav id="nav-menue">
        <NavLink className="menue-icon-container"><img className="menue-icon" src={homePlacholder} alt="home"/></NavLink>
        <NavLink className="menue-icon-container"><img className="menue-icon" src={homePlacholder} alt="library"/></NavLink>
        <NavLink className="menue-icon-container"><img className="menue-icon" src={homePlacholder} alt="meetings"/></NavLink>
        <NavLink className="menue-icon-container"><img className="menue-icon" src={homePlacholder} alt="chats"/></NavLink>
         <div className="curved corner-b-left b-left-grey"></div>
      </nav>
   )
}