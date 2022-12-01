import React, { useEffect, useState } from 'react'
import axios from 'axios'


export default function SaveButton(props) {
    const {postId} = props
    const token = localStorage.getItem("authToken");

    const [saved, setSaved] =useState("save")   
    
    useEffect(() => {
        const apiCall = async () => {
            
            try {
                const currentUser = await axios.get("http://localhost:8000/api/my-profile", { headers: { Authorization: `Bearer ${token}` }})
                setSaved(() => {
                    if (currentUser.data.mySavedPosts.includes(postId)) {
                        return "unsave"
                    } else {return "save"}
                }) 
                
            } catch (error) {
                console.log(error)
            }
        }
        apiCall();
    }, [saved, postId, token])

    

    const saveHandler = async () => {

        try {
            setSaved("unsave")
            const userData = await axios.put(`http://localhost:8000/api/feed/${postId}/save`,{}, { headers: { Authorization: `Bearer ${token}` }});
            console.log(userData, "Data-unsave")

        } catch (error) {
            console.log(error)
        }
    }

    const unsaveHandler = async () => {

        try {
            setSaved("save")
            const userData = await axios.put(`http://localhost:8000/api/feed/${postId}/unsave`,{}, { headers: { Authorization: `Bearer ${token}` }});
            console.log(userData, "Data-save")

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        {saved === "save"? <button onClick={() => saveHandler()} className="vote-button"><i className="fa-regular fa-bookmark vote-icon"></i></button> : <button onClick={() => unsaveHandler()} className="vote-button"><i className="fa-solid fa-bookmark vote-icon"></i></button> }
        </>
    )
}