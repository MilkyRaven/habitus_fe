import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavMenue from '../../components/navigation/NavMenue'
import axios from 'axios'
import { useContext } from "react"
import { AuthContext } from '../../context/AuthContext';
import ProfileHeader from '../../components/profile/ProfileHeader'
import FollowButton from '../../components/profile/FollowButton'

const apiEndpoint = "http://localhost:8000/api/user/"


export default function PublicProfile() {
    const [userProfile, setUserProfile] = useState([])
    const {  user } = useContext(AuthContext);
    const { userId } = useParams()    

    useEffect(() => {
        const apiCall = async () => {
            const token = localStorage.getItem("authToken");
            try {
                const res = await axios.get((apiEndpoint) + (userId), { headers: { Authorization: `Bearer ${token}` }});
                setUserProfile(res.data)
                
            } catch (error) {
                console.log(error)
            }
        }
        apiCall();
    }, [])

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



    return (
        <div>
            {user && (
            <section>
                <ProfileHeader
                profileHeadline={userProfile.username}
                userImage={userProfile.profileImg}
                >
                    <FollowButton
                        userId={userId}
                    />
                </ProfileHeader>
                
                <div className="interest-profile-container">
                    <h2>Habit Interests:</h2>
                    {userProfile.myPreferences !== [] && 
                    userProfile.myPreferences.map((preference, index) => {
                        return (
                            <ul key={index}>
                                <li>{preference}</li>
                            </ul>
                        )
                    })} 
                    {!userProfile.myPreferences[0] && <p>{userProfile.username} hasn't set any Interests, yet!</p>} 
                </div>
                <div className="goals-profile-container">
                    <h2>{userProfile.username}'s Goals:</h2>
                    <p>{userProfile.goals}</p>
                </div>
                <div className="follower-profile-container">
                    <h2>{userProfile.followers.length} Followers</h2>
                </div>
                <div className="post-profile-container">
                    <h2>{userProfile.username}'s posts</h2>
                    <div>
                    {userProfile.myPosts !== [] && 
                    userProfile.myPosts.map((post, index) => {
                        return (
                            <ul key={index}>
                                <li>{post.title}</li>
                                <li>{post.type}</li>
                            </ul>
                        )
                    })} 
                    {!userProfile.myPosts[0] && <p>{userProfile.username} hasn't made any Posts, yet!</p>}
                    </div>
                </div>
            </section>)
            }
            <NavMenue />
        </div>
    )
}