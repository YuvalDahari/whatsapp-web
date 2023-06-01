var ObjectId = require('mongodb').ObjectId;
const UserService = require('./user')
const Chat = require('../models/chat')
const Message = require('../models/message');
const user = require('../models/user');

const createChat = async (firstUsername, secondUsername) => {
    // compare users, if not equal create new chat - return id and user
    if (firstUsername == secondUsername) {
        return false;
    }
    const user1 = await UserService.getIDByUsername(firstUsername);
    const user2 = await UserService.getIDByUsername(secondUsername);
    if (!user1 || !user2) {
        return false;
    }
    const user = new Chat({
        users: [
            user1._id,
            user2._id
        ],
        messages: []
    });
    const chat = await user.save();
    return {
        id: chat._id,
        user: {
            username: user2.username,
            displayName: user2.displayName,
            profilePic: user2.profilePic
        }
    };
};

const getChats = async (username) => {
    // get all chats the username is part of
    // get user id and find all chats is part of
    const user = await UserService.getIDByUsername(username);
    if (!user) {
        return false;
    }
    const chats = await Chat.find({ users: user._id });
    const returnChats = [];
    // user is the second user
    // lastMessage field - null if no, if there is - id, created, content
    for (i = 0; i < chats.length; i++) {
        const chat = chats[i];
        let returnChat = {
            id: chat._id
        };
        const secondUser = chat.users[0].equals(user._id) ? chat.users[1] : chat.users[0];
        returnChat.user = await UserService.getUserByID(secondUser);
        returnChat.lastMessage = null;
        if (chat.messages.length > 0) {
            const messageID = chat.messages.slice(-1);
            const last = await getMessageByID(messageID);
            returnChat.lastMessage = {
                id: messageID,
                created: last.created,
                content: last.content
            };
        }
        returnChats.push(returnChat);
    }
    return returnChats;
}

const getMessageByID = async (ID) => {
    return await Message.findById(ID);
}

const getChat = async (username, chatID) => {
    // check if chatID exists and sender part of it
    const user = await UserService.getIDByUsername(username);
    if (!user) {
        return false;
    }
    // get chat the username is part of
    let chat = await Chat.findById(chatID).findOne({ users: user._id }).populate([{
        path: 'messages',
        select: 'created sender content',
        populate: {
            path: 'sender',
            select: 'username displayName profilePic -_id'
        }
    }, {
        path: 'users',
        select: 'username displayName profilePic -_id'
    }]);
    if (!chat) {
        return false;
    }
    chat = await chat.toJSON();
    for (i = 0; i < chat.messages.length; i++) {
        chat.messages[i].id = chat.messages[i]._id
        delete chat.messages[i]._id
        delete chat.messages[i].__v
    }
    chat.id = chat._id
    delete chat._id
    delete chat.__v
    return chat;
    // get user id and get chat ID if part of - id, users, messages
}

const deleteChat = async (username, chatID) => {
    // if user part of chat - delete
    const chat = await getChatByUserAndID(username, chatID);
    if (!chat) {
        return false;
    }
    return await Chat.deleteOne({ "_id" : chat._id });
}

const sendMessage = async (sender, chatID, messageContent) => {
    // check if chatID exists and sender part of it
    const chat = await getChatByUserAndID(sender, chatID);
    if (!chat) {
        return false;
    }
    let user = await UserService.getIDByUsername(sender);
    if (!user) {
        return false;
    }
    // if so, send message on this chat via this sender
    const message = new Message({
        sender: user._id,
        content: messageContent
    });
    const newMessage = await message.save();

    const upda = await Chat.findOneAndUpdate(
        { _id: chat._id }, 
        { $push: { messages: newMessage._id } }
    );
    if (!upda) {
        return false;
    }

    return {
        id: newMessage._id,
        created: newMessage.created,
        sender: {
            username: user.username,
            displayName: user.displayName,
            profilePic: user.profilePic
        },
        content: newMessage.content
    };
    // return - id, created, sender, content
}

const getChatByUserAndID = async (username, chatID) => {
    const user = await UserService.getIDByUsername(username);
    if (!user) {
        return false;
    }
    // get chat the username is part of
    const chat = await Chat.findById(chatID).findOne({ users: user._id });
    if (!chat) {
        return false;
    }
    return chat;
}

const getMessages = async (username, chatID) => {
    // check if chatID exists and sender part of it
    const user = await UserService.getIDByUsername(username);
    if (!user) {
        return false;
    }
    // get chat the username is part of
    let chat = await Chat.findById(chatID).findOne({ users: user._id }).populate({
        path: 'messages',
        select: 'created sender content',
        populate: {
            path: 'sender',
            select: 'username -_id'
        }
    });
    if (!chat) {
        return false;
    }
    chat = await chat.toJSON();
    for (i = 0; i < chat.messages.length; i++) {
        chat.messages[i].id = chat.messages[i]._id
        delete chat.messages[i]._id
    }
    return chat.messages;

    // return - id, created, sender (only username), content
}

module.exports = { createChat, getChats, getChat, deleteChat, sendMessage, getMessages };