import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import './FindUsers.css'
import NavMenue from '../navigation/NavMenue';
import gathering from '../../assets/images/2.png'
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
    <div className='users-box'>
        <h3>Souls that follow you</h3>
        <div className='user-container'>
            {followers[0] ? followers.map((user)=> {
                return (<div key={user.username}>
                <p><Link to={`/user/${user._id}`}>{user.username}</Link></p>
                <img alt='user profile' width={50} src={user.profileImg}></img>
                </div>)
            }): 
            <div className='users-box'>
            <p> You have no followers yet</p>
            <p>Share your thoughts on the feed page and find souls-alike</p>
            <img id="img-women-gathering" src={gathering} alt="women working img"/>
            </div>
            }
        </div>
        <NavMenue></NavMenue>
    </div>
  )
}
