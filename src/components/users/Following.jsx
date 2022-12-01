import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import './FindUsers.css'
import NavMenue from '../navigation/NavMenue';
import gathering from '../../assets/images/9.png'
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
    <div>

        <div className='users-box'>
        <h3> Souls that you follow</h3>
        {following[0] ? following.map((user)=> {
                return (<div className='user-container' key={user._id}>
                <img alt='user profile' width={50} src={user.profileImg}></img>
                <p><Link to={`/user/${user._id}`}>{user.username}</Link></p>
                </div>)
            }) : <div className='users-box'>
                <p>You are not following anyone yet</p>
                <p>Check the feed page and start following souls that inspire you</p>
                <img id="img-women-gathering" src={gathering} alt="women working img"/>
                </div> }
        </div>
        <NavMenue></NavMenue>
    </div>
  )
}
