import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PostFeed.css'
import SaveButton from '../common/SaveButton';

const apiEndpoint = "http://localhost:8000/api/feed/all";

export default function AllPosts() {

    const token = localStorage.getItem("authToken");
    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        const apiCall = async () => {
            
            try {
                const res = await axios.get(apiEndpoint, { headers: { Authorization: `Bearer ${token}` }});
                setAllPosts(res.data)
            } catch (error) {
                console.log(error)
            }
        };
        apiCall();
    }, [])

  return (
    <div>
    <div> { allPosts.map((post) => {
        
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
                <img className="img-post" src={post.image} alt="" />
                
                <div className="post-social-container">
                    <SaveButton 
                        postId={post._id}
                    />
                </div>
            </div>
        )
    })}

    </div>
    
    
</div>
  )
}
