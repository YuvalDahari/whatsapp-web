import { io } from 'socket.io-client';
import { AddNotification } from '../conversations/Conversations'
import { useEffect } from 'react';

const socketManager = {
  socket: null,

  connect: () => {
    // Establish socket connection with the server
    socketManager.socket = io( process.env.REACT_APP_SERVER_PATH );

    // Delete when its work
    console.log("Socket connected");
  },

  handleNewMsg: (data) => {
    // Delete when work
    console.log("Received newMsg event:", data);

    let sender = data.sender;
    AddNotification(sender);
  },

  addNewMsgListener: () => {
    if (socketManager.socket) {
      useEffect(() => {
          // Add event listener for the "newMsg" event
          socketManager.socket.on("newMsg", socketManager.handleNewMsg);
      }, [socketManager.socket])
    }
  },

  disconnect: () => {
    if (socketManager.socket) {
      socketManager.socket.disconnect();
    
    // Delete when its work
      console.log("Socket disconnected");
    }
  }
};

export default socketManager;
