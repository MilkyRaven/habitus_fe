import React from 'react'
import axios from 'axios';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const apiEndpoint = "http://localhost:8000/api/my-profile/my-posts";

export default function MyPosts() {

    const [myPosts, setMyPosts] = useState([])

    useEffect(() => {
        const apiCall = async () => {
            const token = localStorage.getItem("authToken");
            try {
                const res = await axios.get(apiEndpoint, { headers: { Authorization: `Bearer ${token}` } })
                setMyPosts(res.data)
            }
            catch (err) { console.log(err) }
        }

        apiCall()
    }, [])

    const deleteApiEndpoint = "http://localhost:8000/api/my-profile/";
    const deletePost = async (id) => {
        const token = localStorage.getItem("authToken");
        console.log(id);
        try {
            const res = await axios.put(deleteApiEndpoint + id + "/delete", {}, { headers: { Authorization: `Bearer ${token}` }}); 
            const newPosts = await axios.get(apiEndpoint, { headers: { Authorization: `Bearer ${token}` }});
            setMyPosts(newPosts.data)

            console.log(res);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {myPosts.map((post)=> {
                   return (

                    <div className="post-container" key={post._id}> 
                        <div className="post-title">
                            <h3>
                                <Link className="post-feed-link" to={`/post/${post._id}`}> {post.title}</Link>
                            </h3>

                            <p>{post.createdAt.substring(0,10)}</p>
                        </div>

                        <img className="img-post" src={post.image} alt=""></img>
                
                        <button className="vote-button" onClick={() => deletePost(post._id)}><i className="fa-solid fa-trash-can vote-icon"></i></button>


                    </div>
                   )
                })}
        </div>
    )
}
