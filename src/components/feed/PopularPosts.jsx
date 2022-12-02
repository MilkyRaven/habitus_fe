import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './PostFeed.css'
import SaveButton from '../common/SaveButton';

const apiEndpoint = "http://localhost:8000/api/feed"

export default function PopularPosts() {

    const token = localStorage.getItem("authToken");
    const [popularPosts, setPopularPosts] = useState([]);

    useEffect(() => {
        const apiCall = async () => {

            try {
                const res = await axios.get(apiEndpoint, { headers: { Authorization: `Bearer ${token}` } });
                setPopularPosts(res.data)
                
            } catch (error) {
                console.log(error)
            }
        }
        apiCall();
    }, [])


    return (
        <div className=""> 
       
            {popularPosts.map((post) => {
                return (
                    <div className="post-container" key={post._id}>
                        <p className="date-absolute">{post.createdAt.substring(0,10)}</p>

                        <div className="post-feed-user-container">
                            <Link to={`/user/${post.creator._id}`}>
                                <img className="img-post-feed-user" src={post.creator.profileImg} alt=""/>
                            </Link>
                            <h3>
                                <Link className="post-feed-link" to={`/user/${post.creator._id}`}>@ {post.creator.username} </Link>
                            </h3>
                        </div>

                        <div className="post-title">
                            <h1>
                                <Link className="post-feed-link" to={`/post/${post._id}`}> {post.title}
                                <img className="img-post" src={post.image} alt="" /></Link>
                            </h1>
                        </div>
                        <div className="post-social-container">
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
