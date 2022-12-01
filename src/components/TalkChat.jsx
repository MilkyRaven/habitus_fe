import Talk from 'talkjs';
import axios from 'axios';
import React, { useContext, useEffect, useState, useRef } from 'react'
import { AuthContext } from '../context/AuthContext';
import NavMenue from './navigation/NavMenue';
import './TalkChat.css'
import gathering from '../assets/images/women-gathering.png'


export default function TalkChat() {

    const { user } = useContext(AuthContext);
    const apiEndpoint = "http://localhost:8000/api/user/mutuals";
    const [mutuals, setMutuals] = useState([]);
    const chatboxEl = useRef();
    const [talkLoaded, markTalkLoaded] = useState(false);

    useEffect(() => {
        const apiCall = async () => {
            const token = localStorage.getItem("authToken");
            try {
                const res = await axios.get(apiEndpoint, { headers: { Authorization: `Bearer ${token}` } });
                setMutuals(res.data);
            } catch (error) {
                console.log(error.response.data)
            }
        }
        apiCall();
    }, []);

    // console.log(mutuals)

    const handleUserChat = (props) => {
        console.log(props)

        //start session
        Talk.ready.then(() => markTalkLoaded(true));

        if (talkLoaded) {
            const currentUser = new Talk.User({
                id: user._id,
                name: user.username,
                photoUrl: user.profileImg,
                welcomeMessage: 'Hello!',
                role: 'default',
            });

            const otherUser = new Talk.User({
                id: props._id,
                name: props.username,
                photoUrl: props.profileImg,
                welcomeMessage: 'Hello!',
                role: 'default',
            });
            const session = new Talk.Session({
                appId: 'tFQa8Bsf',
                me: currentUser,
            });
            const conversationId = Talk.oneOnOneId(currentUser, otherUser);
            const conversation = session.getOrCreateConversation(conversationId);
            conversation.setParticipant(currentUser);
            conversation.setParticipant(otherUser);

            const chatbox = session.createChatbox();
            chatbox.select(conversation);
            chatbox.mount(chatboxEl.current);

            return () => session.destroy();
        }


    }


    return (
        <div>
            <div className='contacts-container'>
                <h2>My Contacts</h2>
                {mutuals[0] ? <div> {mutuals.map((user) => {
                    return (
                        <div className='chat-user-card' key={user._id}>
                            <img alt='user profile' width={50} src={user.profileImg}></img>
                            <h3><strong>{user.username}</strong></h3>
                            <button onClick={() => { handleUserChat(user) }}>Let's chat <i className="fa-solid fa-message"></i></button>
                        </div>
                    )
                })} </div> : <div className='no-contacts'>
                    <h3>You have no contacts yet</h3>
                    <p>You have to mutually follow to start a conversation, try to make some friends!</p>
                    <img id="img-women-gathering" src={gathering} alt="women working img"/>

                </div>}
            </div>
            <div className='chat-box' ref={chatboxEl} />
            <NavMenue></NavMenue>
        </div>
    )
}
