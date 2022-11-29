import React from 'react'
import NavMenue from '../../components/navigation/NavMenue'
import MyPosts from '../../components/profile/MyPosts'
import PopularPosts from '../../components/feed/PopularPosts';
import FriendsPosts from '../../components/feed/FriendsPosts';
import FreshPosts from '../../components/feed/FreshPosts';
import CreatePostForm from '../../components/post/CreatePostForm'

export default function Feed () {

    return (
        <div>
            <CreatePostForm />
            <PopularPosts />
            <FriendsPosts />
            <FreshPosts />
            <NavMenue></NavMenue>

        </div>
    )
}