import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';
import SearchUsersBar from './SearchUsersBar';
import { Link } from 'react-router-dom';

export default function AllUsers() {

    const apiEndpoint = "http://localhost:8000/api/user/all";
    const [users, setUsers] = useState(null);
    const [userSearch, setUserSearch] = useState(users);

    useEffect(() => {
        const apiCall = async () => {
            const token = localStorage.getItem("authToken");

            const res = await axios.get(apiEndpoint, { headers: { Authorization: `Bearer ${token}` }})
            console.log(res.data);
            setUsers(res.data)
            setUserSearch(res.data)
        }
        apiCall()
    }, [])

    const handleSearch = (value) => {
        let correctValue = value.toLowerCase()
        if (correctValue === '') {
            setUserSearch(users)
        } else {
        let searchedUsers = users.filter((user) => {
          return (user.username.toLowerCase().includes(correctValue))
        })
        setUserSearch(searchedUsers)
        }
      }


  return (
    <div>AllUsers

<div>
            <SearchUsersBar onSearch={handleSearch} > </SearchUsersBar> 
            <div>
                {!userSearch && <h1>Loading...</h1>}
                { userSearch && userSearch.map((user) => {
                    return (
                        <div key={user._id}>
                            <div>
                                <img width={50} alt='user' src={user.profileImg} />
                            </div>
                            <h3><Link to={`/user/${user._id}`}>{user.username}</Link></h3>
                        </div>
                    )
                })}
            </div>
        </div>

    </div>
  )
}



