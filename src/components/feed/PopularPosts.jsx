import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiEndpoint = "http://localhost:8000/api/feed";

export default function PopularPosts() {

    const [popularPosts, setPopularPosts] = useState([])

    useEffect(() => {
        const apiCall = async () => {
            const token = localStorage.getItem("authToken");
            try {
                const res = await axios.get(apiEndpoint, { headers: { Authorization: `Bearer ${token}` } });
                setPopularPosts(res.data)
                console.log(popularPosts)
            } catch (error) {
                console.log(error)
            }
        }
        apiCall();
    }, [])

    return (
        <div> <h2>Popular Posts</h2>
            {popularPosts.map((post) => {
                return (
                    <div key={post._id}>
                        <h3>{post.title}</h3>
                        <img width={200} src={post.image} alt="" />
                        <p>upvotes: {post.upvotes} downvotes: {post.downvotes}</p>
                        <p>{post.createdAt}</p>
                    </div>
                )
            })}
        </div>
    )
}
