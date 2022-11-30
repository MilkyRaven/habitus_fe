import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PostFeed.css'

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
                    <div className="post-container" key={post._id}>
                        <h1>
                            <Link className="post-feed-link" to={`/${post._id}`}> {post.title}</Link>
                        </h1>
                        
                        <div className="post-feed-user-container">
                            <Link to={`/user/${post.creator._id}`}>
                                <img className="img-post-feed-user" src={post.creator.profileImg} alt=""/>
                            </Link>
                            
                            <h3>
                                <Link className="post-feed-link" to={`/user/${post.creator._id}`}> {post.creator.username} </Link>
                            </h3>
                        </div>

                        <img width={200} src={post.image} alt="" />
                        <p>{post.createdAt}</p>
                    </div>
                )
            })}
        </div>
    )
}
