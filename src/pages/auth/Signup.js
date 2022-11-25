import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css'
import Navbar from '../../components/navigation/Navbar';

export default function Signup() {
   const [user, setUser] = useState({
      username: '',
      email: ''
   })
   const [password, setPassword] = useState('');
   const [passwordControl, setPasswordControl] = useState('');
   const [errorMessage, setErrorMessage] = useState(undefined);
   const navigate = useNavigate();

   const handleChange = (e) => {
      setUser(prev => {
         return {
            ...prev,
            [e.target.name]: e.target.value
         }
      })
   }

   useEffect(() => {
      if (password !== passwordControl) {
         setErrorMessage("Passwords don't match")
      } else {
         setErrorMessage(undefined)
      }
   }, [passwordControl, password])

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/auth/signup`, { username: user.username, email: user.email, password });
         navigate('/create-profile');
      } catch (error) {
         setErrorMessage(error.response.data.error)
      }
   }

   return (
      <div>
      <Navbar></Navbar>
      <section id="signup">
         <form className="form"  onSubmit={handleSubmit}>
            <div className="form-row">
               <label>Username</label>
               <input required type="text" name="username" value={user.username} onChange={handleChange} />
            </div>
            <div className="form-row">
               <label>Email</label>
               <input required type="email" name="email" value={user.email} onChange={handleChange} />
            </div>
            <div className="form-row">
               <label>Password</label>
               <input required type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form-row">
               <label>Repeat the password</label>
               <input required type="password" name="passwordControl" value={passwordControl} onChange={(e) => setPasswordControl(e.target.value)} />
            </div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button className="button-blue-xl" type="submit">Register</button>
         </form>
         <p className="text-centered">Already a Customer? Go to <Link className="link-blue" to="/login">LOG IN</Link></p>
         <ul className="icon-footer-container">
            <li><i class="fa-brands fa-google footer-icon"></i></li>
            <li><i class="fa-brands fa-facebook-f footer-icon"></i></li>
            <li><i class="fa-brands fa-linkedin footer-icon"></i></li>
         </ul>
      </section>
      </div>
   )
}
