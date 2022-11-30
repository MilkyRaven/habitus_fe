import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PostDetails.css'
import CreateComment from '../../components/comments/CreateComment'


import { AuthContext } from '../../context/AuthContext';

const apiEndpoint = "http://localhost:8000/api/feed/"

export default function PostDetails() {
    const {user} = useContext(AuthContext);
    const [postDetails, setPostsDetails] = useState([]);
    // const [comments, setComments] = useState([]);
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
    
    const commentsArray = postDetails.commentsId;
    
    const deleteComment = async (commentId) => {
        const token = localStorage.getItem("authToken");
        try {
            await axios.delete(`http://localhost:8000/api/feed/${commentId}/delete`, { headers: { Authorization: `Bearer ${token}` }});
            const res = await axios.get(apiEndpoint + postId, { headers: { Authorization: `Bearer ${token}` }});
                setPostsDetails(res.data)
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <div className="">
        <h3>{postDetails.title}</h3>
        {postDetails.creator? <h3><Link  to={`/user/${postDetails.creator._id}`} > {postDetails.creator.username}</Link></h3> : <h4>Loading...</h4>}
        <img width={200} alt="post" src={postDetails.image}></img>
        <p>{postDetails.description}</p>
        <p>Downvotes: {postDetails.downvotes}</p>
        <p>Upvotes: {postDetails.upvotes}</p>
        <button>Save</button>
        <div>
        {postDetails.commentsId ==! undefined && <div>Comments: {commentsArray.map((comment)=> {
            return (
                <div key={comment._id}>
                    <h5>{comment.creator.username}</h5>
                    <p>{comment.content}</p>
                    {comment.creator._id === user._id ? <button onClick={()=> deleteComment(comment._id)}>delete</button> : ""} 
                </div>
            )
        })}</div>}
        <CreateComment />
            
        </div>
    </div>
  )
}
