import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiEndpoint = "http://localhost:8000/api/feed/fresh";

export default function FreshPosts() {

    const [freshPosts, setFreshPosts] = useState([])

    useEffect(() => {
        const apiCall = async () => {
            try {
                const res = await axios.get(apiEndpoint);
                setFreshPosts(res.data)
                console.log(freshPosts)
            } catch (error) {
                console.log(error)
            }
        };
        apiCall();
    }, [])
    
    
    return (
        <div>FreshPosts
            {freshPosts.forEach((post) => {
                return (
                    <div>
                        <p>{post.title}</p>
                        <p>{post.image}</p>
                        <p>{post.upvotes}</p>
                        <p>{post.downvotes}</p>
                        <p>{post.createdAt}</p>
                    </div>
                )
            })}
        </div>
    )
}
