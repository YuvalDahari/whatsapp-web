import React, { useEffect, useRef, useMemo } from 'react';
import ChatHeader from "./ChatHeader";
import Message from "./Message";

function Chat({currentUser}) {
    const messsagesData = useMemo(() => currentUser && currentUser.currFriend && currentUser.currFriend.messages ? currentUser.currFriend.messages : [], [currentUser]);

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView()
    }

    useEffect(scrollToBottom);

    if(!currentUser.currFriend || !currentUser || !currentUser.friends || currentUser.friends.length === 0) {
        return (
        <>
            <ChatHeader name={""} img={null} />
        </>
        );
    }

    return (
        <>
            <ChatHeader name={currentUser.currFriend.name} img={currentUser.currFriend.image} />
            <main className="messages" >
                {messsagesData.length > 0 && messsagesData.map((message, index) => (
                <Message
                    key={index}
                    text={message.text}
                    time={message.time}
                    side={message.sender === currentUser.username ? 'left' : 'right'}
                />
                ))}
                <div ref={messagesEndRef} />
            </main>
        </>
    );
}

export default Chat;
