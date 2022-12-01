import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PostFeed.css'

const apiEndpoint = "http://localhost:8000/api/feed/all";

export default function AllPosts() {

    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        const apiCall = async () => {
            const token = localStorage.getItem("authToken");
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
        //deleted
    <div> { allPosts.map((post) => {
        
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

                <p>{post.description}</p>
                <img id="img-post" src={post.image} alt="" />
                
                <div className="bottom-post-container">
                    <p>{post.createdAt}</p>
                    <button className="btn-save"><i className="fa-solid fa-bookmark post-icon-blue"></i></button>
                </div>
            </div>
        )
    })}

    </div>
    
    
</div>
  )
}
