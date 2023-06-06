import React, { useState, useEffect, useRef, useContext } from 'react';
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import { fetchWithToken } from '../tokenManager/tokenManager';
import { CurrentConversationContext } from "../messages/Messages";  // import CurrentConversationContext

function Chat({refreshMessages, setRefreshMessages, refresh, setRefresh}) {
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView()
    }

    const [messagesData, setMessagesData] = useState([]);
    const [currentUser, ] = useState(JSON.parse(localStorage.getItem('currentUser')) || {});

    const { currConversation } = useContext(CurrentConversationContext);

    useEffect(() => {
        if (refreshMessages) {
            const fetchMessages = async () => {
                const req = {
                    path: `Chats/${currConversation.id}/Messages`,
                    method: 'GET',
                    headers: {
                        'Accept': 'text/plain',
                    },
                };
                const response = await fetchWithToken(req);
                setMessagesData(await response.json());
            };

            if (currConversation && currConversation.id) {
                fetchMessages();
            } else {
                setMessagesData([]);  // Clear the messages if there's no current conversation
            }
        }
        setRefreshMessages(false);
    }, [currConversation, refreshMessages, setRefreshMessages]);
    

    useEffect(scrollToBottom, [messagesData]);

    return (
        <>
            <ChatHeader currConversation={currConversation} />

            <main className="messages" >
                {messagesData.length > 0 && [...messagesData].reverse().map((message, id) => (
                <Message
                    key={id}
                    text={message.content}
                    time={new Date(message.created).toLocaleTimeString()}
                    side={message.sender.username === currentUser.username ? 'left' : 'right'}
                />
                ))}
                <div ref={messagesEndRef} />
            </main>
        </>
    );
}

export default Chat;
