import React from 'react'
import NavMenue from '../../components/navigation/NavMenue'
import MyPosts from '../../components/profile/MyPosts'
import PopularPosts from '../../components/feed/PopularPosts';
import FriendsPosts from '../../components/feed/FriendsPosts';
import FreshPosts from '../../components/feed/FreshPosts';

export default function Feed () {

    return (
        <div>
            <PopularPosts />
            <FriendsPosts />
            <FreshPosts />
            <NavMenue></NavMenue> 

        </div>
    )
}