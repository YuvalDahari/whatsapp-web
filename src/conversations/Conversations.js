import React, { useEffect } from 'react';
import Conversation from "./Conversation";
import {isNotConnected} from '../users/user.js';
import ConversationsHeader from './ConversationsHeader';

function Conversations({currentUser, setCurrentUser}) {
    const conversationsData = currentUser && currentUser.friends ? currentUser.friends : [];

    const handleConversationClick = (conversation) => {
        if (isNotConnected(currentUser)) return;
        setCurrentUser({
            ...currentUser,
            currFriend: currentUser && currentUser.friends ? currentUser.friends.find(friend => friend.name === conversation.name) : '',
        });
    };

    useEffect(() => {
        if (isNotConnected(currentUser)) return;
        handleConversationClick(currentUser.currFriend);
    }, []);

    return (
        <div id="conversations-section">
            <ConversationsHeader currentUser={currentUser}/>
            <main className="conversations">
                {conversationsData.length > 0 && conversationsData.map((conversation, index) => (
                    <div key={index} onClick={() => handleConversationClick(conversation)}>
                        <Conversation
                            name={conversation.name ? conversation.name : ""}
                            time={conversation.messages && conversation.messages.length > 0 ? conversation.messages[conversation.messages.length - 1].time : ""}
                            message={conversation.messages && conversation.messages.length > 0 ? conversation.messages[conversation.messages.length - 1].text : ""}
                            img={conversation.image}
                            current={currentUser.currFriend.name === conversation.name}
                        />
                    </div>
                ))}
            </main>
        </div>
    );
}

export default Conversations;