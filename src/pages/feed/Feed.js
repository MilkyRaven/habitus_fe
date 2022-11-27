import React from 'react'
import NavMenue from '../../components/navigation/NavMenue'
import MyPosts from '../../components/profile/MyPosts'

export default function Feed () {

    return (
        <div>
            <h1>My Feed</h1> {/* Can delete later */}
            <MyPosts></MyPosts>
            <NavMenue></NavMenue> 

        </div>
    )
}