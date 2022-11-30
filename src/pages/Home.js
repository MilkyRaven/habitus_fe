import React, { useContext } from 'react';
import './Home.css'
import habitusLogo from '../assets/images/habitus-logo.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';


export default function Home() {
   const { isLoggedIn, user } = useContext(AuthContext);
   console.log(isLoggedIn)
   console.log(user)

   return (
      <div className="homepage-section">
            <img className="img-logo" src={habitusLogo} alt="women gathering img"/>
            <Link className="link-blue-lg" to="/signup">Sign up</Link>
            <Link className="link-brown-lg" to="/login">Login</Link>
            <img id="img-women-gathering" src={require('../assets/images/women-gathering.png')} alt="women gathering img"/>
      </div>
   )
}




           
