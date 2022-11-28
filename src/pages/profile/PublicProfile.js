import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavMenue from '../../components/navigation/NavMenue'
import Navbar from '../../components/navigation/Navbar'
import axios from 'axios'
import { Link } from "react-router-dom";

const apiEndpoint = "http://localhost:8000/api/user/"


export default function PublicProfile() {
    const [userProfile, setUserProfile] = useState([])
    const { userId } = useParams()

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

    const userPreferences = userProfile.myPreferences
    const userPosts = userProfile.myPosts;
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
            <button>Follow</button>
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