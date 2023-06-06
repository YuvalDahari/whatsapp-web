import React, { useEffect, useContext } from "react";
import { fetchWithToken } from "../tokenManager/tokenManager";
import { CurrentConversationContext, RefreshContext } from "../messages/Messages";

function Conversation({ id, name, time, message: lastMessage, img: image, setRefreshMessages, hasNewMessage, setNewMessageConvIds}) {
  const { currConversation, setCurrConversation } = useContext(CurrentConversationContext);
  const { refresh, setRefresh } = useContext(RefreshContext);


  let mediaClass = 'media';
  if (currConversation.id === id && hasNewMessage) {
    mediaClass += ' special-conversation';
  }else if (currConversation.id === id) {
    mediaClass += ' current-conversation';
  } else if (hasNewMessage){
    mediaClass += ' currentAndNewMessage';
  }

  useEffect(() => {
    if (currConversation.id === id) {
      setNewMessageConvIds((prevIds) => prevIds.filter((prevId) => prevId !== id));
    }
  }, [currConversation, id, setNewMessageConvIds]);

  const handleDelete = async () => {
    let duplicateConversation = null;
    if (currConversation && currConversation.id === id) {
      duplicateConversation = null;
    } else {
      duplicateConversation = { ...currConversation };
    }
    const req = {
      path: `Chats/${id}`,
      method: 'DELETE',
      headers: {
        'accept': '*/*',
      },
    };
    await fetchWithToken(req);
    setRefresh(!refresh); // Refresh the list of conversations
    setCurrConversation(duplicateConversation);
    setRefreshMessages(true);
  };

  return (
    <div className={`${mediaClass}`}>
      <img className="avatar" src={image} alt="avatar" />
      <div className="name">{name}</div>
      <div className="time">{time}</div>
      <div className="last-msg">{lastMessage}</div>
      <button className="delete-btn" onClick={handleDelete}>x</button>
    </div>
  );
}

export default Conversation;
