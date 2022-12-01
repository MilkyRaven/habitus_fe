import Talk from 'talkjs';
import { useEffect, useState, useRef, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function MyChatComponent(props) {
  const {user} = useContext(AuthContext);
  const {otherUserChat} = props;
   console.log("this are props", otherUserChat);
  const chatboxEl = useRef();

  // wait for TalkJS to load
  const [talkLoaded, markTalkLoaded] = useState(false);

  const [otherUser, setOtherUser] = useState(otherUserChat);



  otherUserChat = {
    id: otherUserChat._id,
    name: otherUserChat.username,
    photoUrl: otherUserChat.profileImg,
    welcomeMessage: 'Hello!',
    role: 'default',
  }

  useEffect(() => {
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
        id: otherUserChat._id,
        name: otherUserChat.username,
        photoUrl: otherUserChat.profileImg,
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
  }, [talkLoaded]);

  return <div style={{height: '400px'}} ref={chatboxEl} />;
}