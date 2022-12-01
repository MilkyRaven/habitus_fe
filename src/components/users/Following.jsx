import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';

const apiEndpoint = "http://localhost:8000/api/user/following"

export default function Following() {

    const [following, setFollowing] = useState([]);

    useEffect(() => {
        const apiCall = async () => {
            const token = localStorage.getItem("authToken");
            try {
                const res = await axios.get(apiEndpoint, { headers: { Authorization: `Bearer ${token}` }});
                setFollowing(res.data.following)
                console.log(res.data.following);
            } catch (error) {
                console.log(error)
            }
        };
        apiCall();
    }, [])

    console.log(following)

  return (
    <div>Following

        <div>
        {following[0] ? following.map((user)=> {
                return (<div key={user.username}>
                <p>{user.username}</p>
                <img alt='user profile' width={50} src={user.profileImg}></img>
                </div>)
            }) : <p>You are not following anyone yet</p> }
        </div>
    </div>
  )
}
