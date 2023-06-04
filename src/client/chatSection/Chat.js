import React, { useState, useEffect, useRef, useContext } from 'react';
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import { fetchWithToken } from '../tokenManager/tokenManager';
import { RefreshContext, CurrentConversationContext } from "../messages/Messages";  // import CurrentConversationContext

export const [messagesData, setMessagesData] = useState([]);

function Chat() {
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView()
    }

    const [currentUser, ] = useState(JSON.parse(localStorage.getItem('currentUser')) || {});

    const { refresh, setRefresh } = useContext(RefreshContext);
    const { currConversation } = useContext(CurrentConversationContext);

    useEffect(() => {
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
            setRefresh(!refresh);
        };

        if (currConversation && currConversation.id) {
            fetchMessages();
        } else {
            setMessagesData([]);  // Clear the messages if there's no current conversation
        }
    }, [currConversation, refresh, setRefresh]);
    

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
