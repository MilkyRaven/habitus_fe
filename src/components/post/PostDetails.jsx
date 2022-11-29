import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const apiEndpoint = "http://localhost:8000/api/feed/"

export default function PostDetails() {
    const [postDetails, setPostsDetails] = useState([]);
    const {postId} = useParams();

    useEffect(() => {
        const apiCall = async () => {
            const token = localStorage.getItem("authToken");
            try {
                const res = await axios.get(apiEndpoint + postId, { headers: { Authorization: `Bearer ${token}` }});
                setPostsDetails(res.data)
            } catch (error) {
                console.log(error)
            }
        };
        apiCall();
    }, [postId])
  return (
    <div>
        <h3>Title: {postDetails.title}</h3>
        {postDetails.creator? <h4>{postDetails.creator.username}</h4> : <h4>Loading...</h4>}
        <img width={200} alt="post" src={postDetails.image}></img>
        <p>{postDetails.description}</p>
        <p>Downvotes: {postDetails.downvotes}</p>
        <p>Upvotes: {postDetails.upvotes}</p>
        <button>Save</button>
        <div>
            Comments:
        </div>
    </div>
  )
}
