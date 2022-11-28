import React from 'react'
import axios from 'axios';
import { useState, useEffect } from "react";

const apiEndpoint = "http://localhost:8000/api/my-profile/my-posts";

export default function MyPosts() {

    const [myPosts, setMyPosts] = useState([])

    useEffect(() => {
        const apiCall = async () => {
            const token = localStorage.getItem("authToken");
            try {
                const res = await axios.get(apiEndpoint, { headers: { Authorization: `Bearer ${token}` } })
                setMyPosts(res.data)
            }
            catch (err) { console.log(err) }
        }

        apiCall()
    }, [])

    return (
        <div>MyPosts
            {myPosts.map((post)=> {
                   return (
                    <div key={post._id}> 
                        <p>{post.title}</p>
                        <p>{post.image}</p>
                        <p>{post.createdAt}</p>
                        <button>Delete post</button>
                    </div>
                   )
                })}
        </div>
    )
}
