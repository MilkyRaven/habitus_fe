import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';

const apiEndpoint = "http://localhost:8000/api/feed/"

export default function PostDetails() {
    const {user} = useContext(AuthContext);
    const [postDetails, setPostsDetails] = useState([]);
    const [comments, setComments] = useState([]);
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
    
    const deleteCommentApiEndpoint = "http://localhost:8000/api/feed/"
    
    const deleteComment = async (commentId) => {
        const token = localStorage.getItem("authToken");
        try {
            console.log("inside")
            const res = await axios.delete(deleteCommentApiEndpoint + commentId + "/delete", {}, { headers: { Authorization: `Bearer ${token}` }}); 
            const newComments = await axios.get(apiEndpoint, { headers: { Authorization: `Bearer ${token}` }});
            setComments(newComments.data)
            console.log(comments);
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <div>
        <h3>{postDetails.title}</h3>
        {postDetails.creator? <h3><Link  to={`/user/${postDetails.creator._id}`} > {postDetails.creator.username}</Link></h3> : <h4>Loading...</h4>}
        <img width={200} alt="post" src={postDetails.image}></img>
        <p>{postDetails.description}</p>
        <p>Downvotes: {postDetails.downvotes}</p>
        <p>Upvotes: {postDetails.upvotes}</p>
        <button>Save</button>
        <div>
        {postDetails.commentsId? <div>Comments: {commentsArray.map((comment)=> {
            return (
                <div key={comment._id}>
                    <h5>{comment.creator.username}</h5>
                    <p>{comment.content}</p>
                    {/* {comment.creator._id === user._id ? <button onClick={()=> deleteComment(comment._id)}>delete</button> : ""}  */}
                </div>
            )
        })}</div>: <h4>Loading comments...</h4>}
            
        </div>
    </div>
  )
}
