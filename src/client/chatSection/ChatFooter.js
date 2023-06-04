import React, { useState, useContext } from 'react';
import { fetchWithToken } from '../tokenManager/tokenManager';
import { CurrentConversationContext, RefreshContext } from "../messages/Messages";  // import RefreshContext
import socketManager from '../socketManager/socketManager.js';

function ChatFooter() {
  const [messageText, setMessageText] = useState('');

  // Get the currConversation state and refresh function from the context
  const { currConversation } = useContext(CurrentConversationContext);  
  const { refresh, setRefresh } = useContext(RefreshContext);  // get refresh and setRefresh from context

  async function handleMsg () {
    let message = {
      msg : messageText,
    }

    const req = {
      path: `Chats/${currConversation.id}/Messages`,
      method: 'POST',
      headers: {
          'Accept': 'text/plain',
          'Content-Type' : 'application/json'
      },
      body : JSON.stringify(message),
    };
    await fetchWithToken(req);

    let sender = JSON.parse(localStorage.getItem('currentUser'));
    // Send the 'newMsg' event
    socketManager.socket.emit("newMsg", {
      sender: sender.username,
      reciverId: currConversation.id,
    });

    setMessageText('');  // Clear the message input after sending
    setRefresh(!refresh);  // Flip the refresh state to trigger re-fetch of messages
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && messageText.trim() !== '') {
      handleMsg();
    }
  };

  return (
    <footer className="footer">
      <div id="send-group" className="input-group ">
        <input
          type="text"
          className="form-control"
          placeholder="Write a message"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary footer-btn"
            type="button"
            onClick={handleMsg}
            disabled={ messageText === "" || !currConversation}
          >
            Send
          </button>
        </div>
      </div>
    </footer>
  );
}

export default ChatFooter;
