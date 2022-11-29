import React from 'react'
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


export default function ProfilePage() {

    const {  user  } = useContext(AuthContext);


   return (
    <div className="page-relative">
        <NavMenue></NavMenue>
        
        {user &&
            <ProfileHeader 
                profileHeadline={user.username}
                // profileSubheadline="Location" 
            /> 
        }

       {user &&
            <main>
                <CurveContainerLeft></CurveContainerLeft>

                <h3>Habits Interests:</h3>
                <ul>
                    {user.myPreferences && user.myPreferences.map((preference, index) => {
                        return (
                            <li>{preference}</li>
                        )
                    })}
                </ul>

                <h3>My Goals:</h3>
                <p>{user.goals}</p>
                <MyPosts />
                <Link to="/library"> My Library </Link>

                <CurveContainerRight></CurveContainerRight>
            </main>
       }
        
    </div>
   )
}