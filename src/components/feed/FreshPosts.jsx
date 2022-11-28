import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiEndpoint = "http://localhost:8000/api/feed/fresh";

export default function FreshPosts() {

    const [freshPosts, setFreshPosts] = useState([])

    useEffect(() => {
        const apiCall = async () => {
            const token = localStorage.getItem("authToken");
            try {
                const res = await axios.get(apiEndpoint, { headers: { Authorization: `Bearer ${token}` }});
                setFreshPosts(res.data)
            } catch (error) {
                console.log(error)
            }
        };
        apiCall();
    }, [])
    
    
    return (
        <div> <h2>Fresh Posts 🚀</h2>
            
            {freshPosts.map((post) => {
                
                return (
                    <div key={post._id}>
                        <h3>{post.title}</h3>
                        <h3>{post.creator.username}</h3>
                        <img width={200} src={post.image} alt="" />
                        <p>{post.createdAt}</p>
                    </div>
                )
            })}
        </div>
    )
}
