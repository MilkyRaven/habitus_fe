import React, { useState } from 'react'
import NavMenue from '../../components/navigation/NavMenue'
import MyPosts from '../../components/profile/MyPosts'
import PopularPosts from '../../components/feed/PopularPosts';
import FriendsPosts from '../../components/feed/FriendsPosts';
import FreshPosts from '../../components/feed/FreshPosts';
import ModalModule from '../../components/common/ModalModule';
import CreatePostForm from '../../components/post/CreatePostForm'
import './feed.css'

export default function Feed () {
    const [isOpen, setIsOpen] = useState(false)

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <div>
            <button id="btn-create-post" onClick={() => setIsOpen(true)}>Create</button>
            {isOpen && 
                <ModalModule setIsOpen={setIsOpen}>
                    <CreatePostForm closeModalHandler={closeModal}/>
                </ModalModule>
    
            }
            
            <PopularPosts />
            <FriendsPosts />
            <FreshPosts />
            <NavMenue></NavMenue>
        </div>
    )
}