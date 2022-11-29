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
        <div>MyPosts
            {myPosts.map((post)=> {
                   return (
                    <div key={post._id}> 
                        <h3><Link  to={`/${post._id}`}> {post.title}</Link></h3>
                        <img alt={post} width={200} src={post.image}></img>
                        <p>{post.createdAt}</p>
                        <button onClick={() => deletePost(post._id)}>Delete post</button>
                    </div>
                   )
                })}
        </div>
    )
}
