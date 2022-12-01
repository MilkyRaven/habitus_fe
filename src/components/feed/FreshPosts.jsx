import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PostFeed.css'
import SaveButton from '../common/SaveButton';

const apiEndpoint = "http://localhost:8000/api/feed/fresh";

export default function FreshPosts() {
    
    const token = localStorage.getItem("authToken");
    const [freshPosts, setFreshPosts] = useState([])

    useEffect(() => {
        const apiCall = async () => {
            
            try {
                const res = await axios.get(apiEndpoint, { headers: { Authorization: `Bearer ${token}` }});
                setFreshPosts(res.data)
            } catch (error) {
                console.log(error)
            }
        };
        apiCall();
    }, [token])
    
    return (
        <div>
            
            {freshPosts.map((post) => {
                
                return (
                    
                    <div className="post-container" key={post._id}>
                        <div className="post-title">
                            <h1>
                                <Link className="post-feed-link" to={`/post/${post._id}`}> {post.title}</Link>
                            </h1>

                            <p>{post.createdAt}</p>
                        </div>
                        
                        <div className="post-feed-user-container">
                            <Link to={`/user/${post.creator._id}`}>
                                <img className="img-post-feed-user" src={post.creator.profileImg} alt=""/>
                            </Link>
                            
                            <h3>
                                <Link className="post-feed-link" to={`/user/${post.creator._id}`}> {post.creator.username} </Link>
                            </h3>
                        </div>

                        <p>{post.description}</p>
                        <img className="img-post" src={post.image} alt="" />
                        
                        <div className="bottom-post-container">
                            {/* <p>upvotes: {post.upvotes} downvotes: {post.downvotes}</p> */}
                            <SaveButton 
                                postId={post._id}
                            />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
