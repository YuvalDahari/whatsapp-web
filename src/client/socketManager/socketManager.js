import { io } from 'socket.io-client';
import { serverPath } from '../../App';
import { addNotification } from '../conversations/Conversations'

const socketManager = {
  socket: null,

  connect: () => {
    // Establish socket connection with the server
    socketManager.socket = io( serverPath );

    // Delete when its work
    console.log("Socket connected");
  },

  handleNewMsg: (data) => {
    // Delete when work
    console.log("Received newMsg event:", data);

    let sender = data.sender;
    addNotification(sender);
  },

  addNewMsgListener: () => {
    if (socketManager.socket) {
      // Add event listener for the "newMsg" event
      socketManager.socket.on("newMsg", socketManager.handleNewMsg);
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
