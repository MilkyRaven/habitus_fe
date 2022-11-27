import React, { useContext } from 'react';
import Navbar from '../components/navigation/Navbar'
import './Home.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';




export default function Home() {
   const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
   console.log(isLoggedIn)
   console.log(user)

   return (
      <div>
         <Navbar />
         <main>
            <h1>Home</h1>
            <h2>temporary NavBar:</h2>
            <ul>
               <li><Link  to="/">Home</Link></li>
               <li><Link  to="/signup">Sign up</Link></li>
               <li><Link  to="/login">Login</Link></li>
               <li><Link  to="/private">Private view</Link></li>
               <li><Link  to="/create-profile">Create Profile</Link></li>
               <li><Link  to="/profile">Profile</Link></li>
               <li><Link  to="/feed" >Feed</Link></li>
               <li><Link  to="/chat" >Chat</Link></li>
               {isLoggedIn && <li><button onClick={() => logOutUser()}>Log out</button></li>}
            </ul>
            
            </main>
      </div>
   )
}


           
