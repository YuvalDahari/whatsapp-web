import React, { useContext, useEffect, useState } from 'react';
import Conversation from "./Conversation";
import ConversationsHeader from './ConversationsHeader';
import { fetchWithToken } from '../tokenManager/tokenManager';
import { RefreshContext, CurrentConversationContext } from '../messages/Messages';  
import { socket } from '../App';

function Conversations({refreshMessages, setRefreshMessages}) {
    const [conversationsData, setConversationsData] = useState([]);
    const [isToastVisible, setToastVisible] = useState(false);
    
    const { refresh, } = useContext(RefreshContext);
    const { setCurrConversation } = useContext(CurrentConversationContext); 

    const fetchConversations = async () => {
      const req = {
        path: `Chats`,
        method: 'GET',
        headers: {
          'Accept': 'text/plain',
        },
      };
      const response = await fetchWithToken(req);
      const conversations = await response.json();
      
      const sortedConversations = conversations.sort((a, b) => {
        const lastMsgA = a.lastMessage ? a.lastMessage.created : '';
        const lastMsgB = b.lastMessage ? b.lastMessage.created : '';
    
        if (lastMsgA && lastMsgB) {
          if (lastMsgA < lastMsgB) {
            return 1; 
          } else if (lastMsgA > lastMsgB) {
            return -1; // A comes before B
          }
          // for chats with no last messages
        } else if (lastMsgA) {
          return -1; // A comes before B
        } else if (lastMsgB) {
          return 1; // B comes before A
        }
    
        return 0; // No change in order (both chats have no last message)
      });
        setConversationsData(sortedConversations);
    };

    useEffect(() => {
      fetchConversations();
      const newMessageHandler = (data) => {
        alert("you have a new message");
        fetchConversations();
        setRefreshMessages(true);
      };
      socket.on("newMsg", newMessageHandler);

      // Cleanup function
      return () => {
        socket.off("newMsg", newMessageHandler);
      }
    }, [refresh]);

    const handleConversationClick = (conversation) => {
        let newConversation = {
            id : conversation.id,
            username : conversation.user.username,
            displayName : conversation.user.displayName,
            profilePic : conversation.user.profilePic,
        }
        setCurrConversation(newConversation);
        setRefreshMessages(true);
    }; 

    return (
      <>
      <div id="conversations-section">
        <ConversationsHeader />
        <main className="conversations">
          {conversationsData.length > 0 && conversationsData.map((conversation, index) => (
            <div key={index} onClick={() => handleConversationClick(conversation)}>
              <Conversation
                id={conversation.id}
                name={conversation.user.displayName} 
                time={conversation.lastMessage ? new Date(conversation.lastMessage.created).toLocaleTimeString() : ""} 
                message={conversation.lastMessage ? conversation.lastMessage.content : ""} 
                img={conversation.user.profilePic}
                setRefreshMessages={ setRefreshMessages}
              />
            </div>
          ))}
        </main>
      </div>
      </>
    );
      
}

export default Conversations;