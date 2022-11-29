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
    const {  user } = useContext(AuthContext);
    const { userId } = useParams()
    const [followed, setFollowed] =useState("follow")

    //const TestID = user[0]
    
    

    useEffect(() => {
        const apiCall = async () => {
            const token = localStorage.getItem("authToken");
            try {
                const res = await axios.get((apiEndpoint) + (userId), { headers: { Authorization: `Bearer ${token}` }});
                setUserProfile(res.data)

                const currentUser = await axios.get("http://localhost:8000/api/my-profile", { headers: { Authorization: `Bearer ${token}` }})
                console.log(currentUser.data, "INSIDE USE E")
                setFollowed(() => {
                    if (currentUser.data.following.includes(res.data._id)) {
                        return "follow"
                    } else {return "unfollow"}
                }) 
                console.log(followed, "FOLLOW")
                
            } catch (error) {
                console.log(error)
            }
        }
        apiCall();
    }, [user, followed, userId])

    /* const followHandler = async () => {
        const token = localStorage.getItem("authToken");

        try {
            const resFollowing = await axios.put(`${apiEndpoint}${userId}/set-following`,{}, { headers: { Authorization: `Bearer ${token}` }});
            const resFollower = await axios.put(`${apiEndpoint}${userId}/set-follower`,{}, { headers: { Authorization: `Bearer ${token}` }});
            setFollowed(() => {
                if (resFollowing.data.following.includes(resFollower.data._id)) {
                    return "follow"
                } else {return "unfollow"}
            }) 

        } catch (error) {
            console.log(error)
        }
    } */
    const followHandler = async () => {
        const token = localStorage.getItem("authToken");

        try {
            const resFollowing = await axios.put(`${apiEndpoint}${userId}/follow`,{}, { headers: { Authorization: `Bearer ${token}` }});
            setFollowed("unfollow")

        } catch (error) {
            console.log(error)
        }
    }

    const unfollowHandler = async () => {
        const token = localStorage.getItem("authToken");

        try {
            const resFollowing = await axios.put(`${apiEndpoint}${userId}/follow`,{}, { headers: { Authorization: `Bearer ${token}` }});
            setFollowed("unfollow")

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
            {user && (
            <section>
            {/* {console.log(userProfile, "USER-PROFILE")} */}
            <h3>{userProfile.username}</h3>
            {/* <p>Followers: {userFollowersNumber}</p>
            <p>Following: {userFollowingNumber}</p> */}
            <img alt='username profile' width={200} src={userProfile.profileImg}></img>
            {followed === "follow"? <button onClick={followHandler}>Follow</button> : <button onClick={unfollowHandler}>UnFollow</button> }
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
            </section>)}
            <NavMenue />
        </div>
    )
}