import React, { useState } from 'react'
import NavMenue from '../../components/navigation/NavMenue'
import MyPosts from '../../components/profile/MyPosts'
import PopularPosts from '../../components/feed/PopularPosts';
import FriendsPosts from '../../components/feed/FriendsPosts';
import FreshPosts from '../../components/feed/FreshPosts';
import ModalModule from '../../components/common/ModalModule';
import CreatePostForm from '../../components/post/CreatePostForm'
import './feed.css'
import { NavLink } from 'react-router-dom';

export default function Feed (props) {
    const [isOpen, setIsOpen] = useState(false)

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <div className="feeds-page">

            <div id="fix-container">
                <button id="btn-create-post" onClick={() => setIsOpen(true)}><i className="fa-solid fa-plus post-icon"></i></button>
            </div>

            {isOpen && 
                <ModalModule 
                setIsOpen={setIsOpen}
                modalHeadline={"Create a Post"}>
                    <CreatePostForm closeModalHandler={closeModal}/>
                </ModalModule>
            }

            <div className="feed-container">

                <div className="list-container">
                    <NavLink className="feed-links" to="/fresh-posts">Fresh</NavLink>
                    <NavLink className="feed-links" to="/friends-posts">Friends</NavLink>
                    <NavLink className="feed-links" to="/popular-posts">Popular</NavLink>
                </div>

            {props.children}

            </div>
            <NavMenue></NavMenue>
        </div>
    )
}