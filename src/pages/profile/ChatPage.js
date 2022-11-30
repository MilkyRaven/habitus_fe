import React, { useState } from 'react'
import Chat from '../../components/Chat'
import Mutuals from '../../components/profile/Mutuals'
import TalkChat from '../../components/TalkChat';

export default function ChatPage() {
  const [secondUser, setSecondUser] = useState();
  const pull_data = (data) => {
    setSecondUser(data);
  }

  // console.log("chaaat", secondUser);

  return (
    <div>
      {/* <Mutuals func={pull_data} />
        {secondUser && <Chat otherUserChat = {secondUser} />} */}
        <TalkChat />
    </div>
  )
}
