import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavMenue from '../../components/navigation/NavMenue'
import Navbar from '../../components/navigation/Navbar'
import axios from 'axios'
import { useContext } from "react"
import { AuthContext } from '../../context/AuthContext';

const apiEndpoint = "http://localhost:8000/api/user/"


export default function PublicProfile() {
    const [userProfile, setUserProfile] = useState([])
    const {  user  } = useContext(AuthContext);
    const { userId } = useParams()
    const [followState, setFollowState] =useState("Follow")

    console.log(user , "USER")

    useEffect(() => {
        const apiCall = async () => {
            try {
                const res = await axios.get((apiEndpoint) + (userId));
                setUserProfile(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        apiCall();
    }, [])

    const followHandler = async () => {
        const token = localStorage.getItem("authToken");

        try {
            const resFollowing = await axios.put(`${apiEndpoint}${userId}/set-following`,{}, { headers: { Authorization: `Bearer ${token}` }});
            const resFollower = await axios.put(`${apiEndpoint}${userId}/set-follower`,{}, { headers: { Authorization: `Bearer ${token}` }});
        } catch (error) {
            console.log(error)
        }
    }

   

    // const userPreferences = userProfile.myPreferences
    // const userPosts = userProfile.myPosts;
    // const userFollowingNumber = userProfile.following.length;
    // const userFollowersNumber = userProfile.followers.length;

    return (
        <div>
            <Navbar />
            {console.log(userProfile)}
            <h3>{userProfile.username}</h3>
            {/* <p>Followers: {userFollowersNumber}</p>
            <p>Following: {userFollowingNumber}</p> */}
            <img alt='username profile' width={200} src={userProfile.profileImg}></img>
            <button onClick={followHandler}>{followState}</button>
            <p>{userProfile.goals}</p>
            <p> Interests:</p>
            {/* {userPreferences.map((preference) => {
                return (
                    <ul>
                        <li>{preference}</li>
                    </ul>
                )
            })} */}
            <h4>{userProfile.username} posts</h4>
            <div>
                {/* {userPosts.map((post) => {
                    return (
                        <div>
                            <h5>{post.title}</h5>
                            <img src={post.image}></img>
                        </div>
                    )
                })} */}
            </div>
            <NavMenue />
        </div>
    )
}