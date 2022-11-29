import React, { useEffect, useState } from 'react'
import CurveContainerLeft from '../../components/common/CurveContainerLeft'
import CurveContainerRight from '../../components/common/CurveContainerRight'
import NavMenue from '../../components/navigation/NavMenue'
import ProfileHeader from '../../components/profile/ProfileHeader'

import Navbar from '../../components/navigation/Navbar'
// import axios from 'axios'
import { useContext } from "react"
import { AuthContext } from '../../context/AuthContext';
import { Link } from "react-router-dom";
import MyPosts from '../../components/profile/MyPosts'
import axios from 'axios'


export default function ProfilePage() {

    const {  user  } = useContext(AuthContext);
    const [ currentUser, setCurrentUser] = useState({})


    useEffect( () => {
        const apiCall = async () => {
            const token = localStorage.getItem("authToken");

            try {
                const userData = await axios.get("http://localhost:8000/api/my-profile", { headers: { Authorization: `Bearer ${token}` }});
                console.log(userData.data, "data")
                setCurrentUser(userData.data)
                console.log(currentUser, "meeeeee")
            } catch (error) {
                console.log(error)
            }
        }
        apiCall()
    }, [])


   return (
    <div className="page-relative">
        <NavMenue></NavMenue>
        
        {currentUser &&
            <ProfileHeader 
                profileHeadline={user.username}
            > 
                <Link to="/edit-profile" className="menue-icon-container"><i className="fa-solid fa-pen menue-icon"></i></Link>
            </ProfileHeader>
        }

       {currentUser &&
            <main>
                <CurveContainerLeft></CurveContainerLeft>

                <h3>Habits Interests:</h3>
                <ul>
                    {currentUser.myPreferences && currentUser.myPreferences.map((preference, index) => {
                        return (
                            <li key={index}>{preference}</li>
                        )
                    })}
                </ul>

                <h3>My Goals:</h3>
                <p>{currentUser.goals}</p>
                <MyPosts />
                <Link to="/library"> My Library </Link>

                <CurveContainerRight></CurveContainerRight>
            </main>
       }
        
    </div>
   )
}