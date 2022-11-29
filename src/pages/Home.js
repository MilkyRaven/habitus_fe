import React, { useContext } from 'react';
import Navbar from '../components/navigation/Navbar'
import './Home.css'
import habitusLogo from '../assets/images/habitus-logo.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import CreateProfileForm from '../components/post/CreatePostForm';




export default function Home() {
   const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
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





// <ul>
// <li><Link  to="/">Home</Link></li>
// <li><Link  to="/signup">Sign up</Link></li>
// <li><Link  to="/login">Login</Link></li>
// <li><Link  to="/private">Private view</Link></li>
// <li><Link  to="/create-profile">Create Profile</Link></li>
// <li><Link  to="/profile">Profile</Link></li>
// <li><Link  to="/feed" >Feed</Link></li>
// <li><Link  to="/chat" >Chat</Link></li>
// {isLoggedIn && <li><button onClick={() => logOutUser()}>Log out</button></li>}
// </ul>


           
