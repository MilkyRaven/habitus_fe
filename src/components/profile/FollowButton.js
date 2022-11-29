import React, { useEffect, useState } from 'react'
import axios from 'axios'

const apiEndpoint = "http://localhost:8000/api/user/"


export default function PublicProfile(props) {
    const {userId} = props
    const token = localStorage.getItem("authToken");

    const [followed, setFollowed] =useState("follow")   
    
    useEffect(() => {
        const apiCall = async () => {
            
            try {
                const currentUser = await axios.get("http://localhost:8000/api/my-profile", { headers: { Authorization: `Bearer ${token}` }})
                setFollowed(() => {
                    if (currentUser.data.following.includes(userId)) {
                        return "unfollow"
                    } else {return "follow"}
                }) 
                
            } catch (error) {
                console.log(error)
            }
        }
        apiCall();
    }, [followed, userId, token])

    

    const followHandler = async () => {

        try {
            setFollowed("unfollow")
            const resFollowing = await axios.put(`${apiEndpoint}${userId}/follow`,{}, { headers: { Authorization: `Bearer ${token}` }});
            console.log(resFollowing, "Data-unfollow")

        } catch (error) {
            console.log(error)
        }
    }

    const unfollowHandler = async () => {

        try {
            setFollowed("follow")
            const resFollowing = await axios.put(`${apiEndpoint}${userId}/unfollow`,{}, { headers: { Authorization: `Bearer ${token}` }});
            console.log(resFollowing, "Data-follow")

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
        {followed === "follow"? <button onClick={() => followHandler()}>Follow</button> : <button onClick={() => unfollowHandler()}>UnFollow</button> }
        </div>
    )
}