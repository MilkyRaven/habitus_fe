import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiEndpoint = "http://localhost:8000/api/feed/following";

export default function FriendsPosts() {

    const [friendsPosts, setFriendsPosts] = useState([])

    useEffect(() => {
        const apiCall = async () => {
            try {
                const res = await axios.get(apiEndpoint);
                setFriendsPosts(res.data)
                console.log(friendsPosts)
            } catch (error) {
                console.log(error)
            }
        }
        apiCall();
    }, [])
    
    
    return (
        <div>FriendsPosts
            {friendsPosts.forEach((post) => {
                return (
                    <div>
                        <p>{post.title}</p>
                        <p>{post.image}</p>
                        <p>{post.upvotes}</p>
                        <p>{post.downvotes}</p>
                        <p>{post.createdAt}</p>
                    </div>
                )
            })}
        </div>
    )
}