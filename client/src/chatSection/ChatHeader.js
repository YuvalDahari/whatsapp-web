import React, { useContext } from 'react';
import { CurrentConversationContext } from '../messages/Messages';  // import CurrentConversationContext

function ChatHeader() {
    const { currConversation } = useContext(CurrentConversationContext);
    const name = currConversation ? currConversation.displayName : '';
    const img = currConversation ? currConversation.profilePic : '';

    if(!img) {
        return (
            <header className="right-header">
                <div className="text"></div>
            </header>
        );
    }
    return (
        <header className="right-header">
            <img className="avatar" src={img} alt="avatar" />
            <div className="media-body">{name}</div>
        </header>
    );
}

export default ChatHeader;
