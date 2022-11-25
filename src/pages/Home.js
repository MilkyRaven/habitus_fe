import React from 'react'
import Navbar from '../components/navigation/Navbar'
import './Home.css'
import Chat from '../components/Chat'
import { Link } from 'react-router-dom'

export default function Home() {
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
            </ul>
            
            </main>
         <Chat />
      </div>
   )
}


           
