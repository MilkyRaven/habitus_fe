import Talk from 'talkjs';
import axios from 'axios';
import React, { useContext, useEffect, useState, useRef } from 'react'
import { AuthContext } from '../context/AuthContext';

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
        <div>TalkChat
            <div>
                <h2>My Contacts</h2>
                {mutuals.map((user) => {
                    return (
                        <div key={user._id}>
                            <p>{user.username}</p>
                            <button onClick={() => { handleUserChat(user) }}>Chat</button>
                        </div>
                    )
                })}
            </div>
            <div style={{height: '400px'}} ref={chatboxEl} />
        </div>
    )
}
