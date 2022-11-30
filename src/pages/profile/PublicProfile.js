import './ProfilePages.css'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavMenue from '../../components/navigation/NavMenue'
import axios from 'axios'
import ProfileHeader from '../../components/profile/ProfileHeader'
import FollowButton from '../../components/profile/FollowButton'

const apiEndpoint = "http://localhost:8000/api/user/"


export default function PublicProfile() {

    const [userProfile, setUserProfile] = useState({})
    const { userId } = useParams()    

    useEffect(() => {
        const apiCall = async () => {
            const token = localStorage.getItem("authToken");
            try {
                const res = await axios.get((apiEndpoint) + (userId), { headers: { Authorization: `Bearer ${token}` }});
                setUserProfile(res.data)
                console.log(res.data)
                
            } catch (error) {
                console.log(error)
            }
        }
        apiCall();
    }, [])


    return (
        <div>
            {userProfile && (
            <section>
                <ProfileHeader
                profileHeadline={userProfile.username}
                userImage={userProfile.profileImg}>
                    <FollowButton
                        userId={userId}
                    />
                </ProfileHeader>
                <div id="habit-interest" className="start-container">
                    <h3>Habit Interests:</h3>
                    {userProfile.myPreferences !== undefined && <ul>
                         {userProfile.myPreferences.map((preference, index) => {
                            return (
                                    <li key={index}>{preference}</li>
                            )
                        })}  
                    </ul>}
                    {/* {!userProfile.myPreferences !== undefined && <p><strong>{userProfile.username}</strong> hasn't set any interests yet!</p>}  */}
                </div>
                <div id="goals" className="profile-container">
                    <h3>{userProfile.username}'s Goals:</h3>
                    {userProfile.goals? <p>{userProfile.goals}</p> : <p>Haven't set any goals yet!</p>}

                    <div className="curved corner-b-left cc-goals"></div>
                </div>
                <div id="follower" className="profile-container">
                    {/* <h3>{userProfile.followers.length} Followers</h3> */}
                    <div className="curved corner-b-left cc-follower"></div>
                </div>
                <div id="post" className="profile-container nav-margin">
                    <h3>{userProfile.username}'s posts</h3>
                    <div>
                        {console.log(userProfile.myPosts)}
                    {userProfile.myPosts !== undefined && 
                    userProfile.myPosts.map((post, index) => {
                        return (
                            <ul key={index}>
                                <li>{post.title}</li>
                            </ul>
                        )
                    })} 
                    {/* {!userProfile.myPosts !== undefined && <p><strong>{userProfile.username}</strong> hasn't made any posts yet!</p>} */}
                    </div>
                    <div className="curved corner-b-left cc-post"></div>
                </div>
            </section>)
            }
            <NavMenue />
        </div>
    )
}