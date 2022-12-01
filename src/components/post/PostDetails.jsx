import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PostDetails.css'
import CreateComment from '../../components/comments/CreateComment'
import ProfileHeader from '../profile/ProfileHeader'
import Navmenue from '../navigation/NavMenue'
import SaveButton from '../common/SaveButton';

import { AuthContext } from '../../context/AuthContext';

const apiEndpoint = "http://localhost:8000/api/feed/"

export default function PostDetails() {

    const token = localStorage.getItem("authToken");
    const {user} = useContext(AuthContext);
    const [postDetails, setPostsDetails] = useState([]);
    const [upvotes, setUpvotes] = useState(0);
    const [downvotes, setDownvotes] = useState(0);
    // const [comments, setComments] = useState([]);
    const {postId} = useParams();

    useEffect(() => {
        const apiCall = async () => {
            try {
                const res = await axios.get(apiEndpoint + postId, { headers: { Authorization: `Bearer ${token}` }});
                
                console.log(res.data, "DATA")
                setPostsDetails(res.data)
                setUpvotes(res.data.upvotes.length)
                setDownvotes(res.data.downvotes.length)
                
            } catch (error) {
                console.log(error)
            }
        };
        apiCall();
    }, [postId, upvotes, downvotes, token])
    
    const commentsArray = postDetails.commentsId;
    
    const deleteComment = async (commentId) => {
        
        try {
            await axios.delete(`http://localhost:8000/api/feed/${commentId}/delete`, { headers: { Authorization: `Bearer ${token}` }});
            const res = await axios.get(apiEndpoint + postId, { headers: { Authorization: `Bearer ${token}` }});
                setPostsDetails(res.data)
        } catch (error) {
            console.log(error)
        }
    }


    const upvoteHandler = async () => {
        try {
            const upvotingDb = await axios.put(`http://localhost:8000/api/feed/${postId}/upvote`,{}, { headers: { Authorization: `Bearer ${token}` }});
            setUpvotes(upvotingDb.data.upvotes.length, "just added an upvote")
            
        } catch (error) {
            console.log(error)
        }
    }

    const downvoteHandler = async () => {
        try {
            const downvotingDb = await axios.put(`http://localhost:8000/api/feed/${postId}/downvote`,{}, { headers: { Authorization: `Bearer ${token}` }});
            setDownvotes(downvotingDb.data.downvotes.length)
        } catch (error) {
            console.log(error)
        }
    }



  return (
         <div className="">
         {user &&
            <ProfileHeader
                profileHeadline={user.username}
                userImage={user.profileImg}> 
                {postDetails.creator? <h3><Link  to={`/user/${postDetails.creator._id}`} > {postDetails.creator.username}</Link></h3> : <h4>Loading...</h4>}

            </ProfileHeader>
            }
            <div className="detail-img-container">
                <img className="detail-img" alt="post" src={postDetails.image}></img>
            </div>
            <article className="detail-content">
                <h2>{postDetails.title}</h2>
                <p>{postDetails.description}</p>
            </article>
            <section className="detail-social-bar">
{/*                 <span><i className="fa-light fa-comment"></i> {postDetails.commentsId.length}</span>
 */}                <span>Votes:</span>
                <button className="vote-button" onClick={() => upvoteHandler()}><i className="fa-solid fa-circle-up vote-icon"></i> {upvotes}</button>
                <button className="vote-button" onClick={() => downvoteHandler()}><i className="fa-solid fa-circle-down vote-icon"></i> {downvotes}</button>
                <SaveButton 
                    postId={postId}
                />
            </section>
            
            <section id="comment-section">
                
            {postDetails.commentsId && user._id  && <div>Comments: {commentsArray.map((comment)=> {
                return (                
                    <div key={comment._id}>
                        <h5>{comment.creator.username}</h5>
                        <p>{comment.content}</p>
                        {user !== null ? 
                        comment.creator._id === user._id ? <button onClick={()=> deleteComment(comment._id)}>delete</button> : "" : <h2>Loading...</h2> }
                    </div>
                )
            })}</div>}
            <CreateComment />
                
            </section>

            <Navmenue></Navmenue>
        </div>
  )
}
