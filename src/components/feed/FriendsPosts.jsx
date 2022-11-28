import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiEndpoint = "http://localhost:8000/api/feed/following";

export default function FriendsPosts() {

    const [friendsPosts, setFriendsPosts] = useState([])

    useEffect(() => {
        const apiCall = async () => {
            const token = localStorage.getItem("authToken");
            try {
                const res = await axios.get(apiEndpoint, { headers: { Authorization: `Bearer ${token}` }});
                setFriendsPosts(res.data)
                console.log(friendsPosts)
            } catch (error) {
                console.log(error)
            }
        }
        apiCall();
    }, [])
    
    
    return (
        <div> <h2>Friends Posts 💕</h2>
            {friendsPosts.map((post) => {
                return (
                    <div key={post._id}>
                        <h3>{post.title}</h3>
                        <p>{post.image}</p>
                        <p>upvotes: {post.upvotes} downvotes:{post.downvotes}</p>
                        <p>{post.createdAt}</p>
                    </div>
                )
            })}
        </div>
    )
}