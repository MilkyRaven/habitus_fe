import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';

const apiEndpoint = "http://localhost:8000/api/user/followers"

export default function Followers() {

    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        const apiCall = async () => {
            const token = localStorage.getItem("authToken");
            try {
                const res = await axios.get(apiEndpoint, { headers: { Authorization: `Bearer ${token}` }});
                setFollowers(res.data.followers)
                console.log(res.data.followers);
            } catch (error) {
                console.log(error)
            }
        };
        apiCall();
    }, [])

    console.log(followers)

  return (
    <div>Followers

        <div>
            {followers[0] ? followers.map((user)=> {
                return (<div key={user.username}>
                <p><Link to={`/user/${user._id}`}>{user.username}</Link></p>
                <img alt='user profile' width={50} src={user.profileImg}></img>
                </div>)
            }): <p> You have no followers yet</p>}
        </div>
    </div>
  )
}
