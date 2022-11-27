import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiEndpoint = "http://localhost:8000/api/feed";

export default function PopularPosts() {

    const [popularPosts, setPopularPosts] = useState([])

    useEffect(() => {
        const apiCall = async () => {
            try {
                const res = await axios.get(apiEndpoint);
                setPopularPosts(res.data)
                console.log(popularPosts)
            } catch (error) {
                console.log(error)
            }
        }
        apiCall();
    }, [])
    
    return (
        <div>Popular Posts
            {popularPosts.forEach((post) => {
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
