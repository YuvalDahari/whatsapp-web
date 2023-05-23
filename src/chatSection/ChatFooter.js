import { AddMessage } from "../Users/user";
import React, { useState, } from 'react';

function ChatFooter({ users, setUsers, currentUser, setCurrentUser }) {
  const [messageText, setMessageText] = useState('');

  const hasFriends = currentUser && currentUser.friends ? currentUser.friends.length > 0 : false;

  const handleMsg = () => {
    if (!hasFriends) return; // Don't handle the message if there are no friends

    const date = new Date();

    const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const ampm = date.getHours() >= 12 ? 'pm' : 'am';

    const formattedTime = `${hour}:${minutes} ${ampm}`;

    const text = messageText;
    const sender = currentUser.username;
    const msg = {
      text: text,
      time: formattedTime,
      sender: sender,
    };
    AddMessage(users, setUsers, currentUser, setCurrentUser, currentUser.currFriend.name, msg);
    setMessageText('');  // Clear the message input after sending
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
            disabled={!hasFriends || messageText === ""}
          >
            Send
          </button>
        </div>
      </div>
      {!hasFriends}
    </footer>
  );
}

export default ChatFooter;
