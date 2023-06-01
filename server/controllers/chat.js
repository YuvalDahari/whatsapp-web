const chatService = require('../services/chat')

const createChat = async (req, res) => {
    const json = await chatService.createChat(req.username, req.body.username);
    if (!json) {
        return res.status(401).json({"title": "User does not exists"});
    }
    res.json(json);
};

const getChats = async (req, res) => {
    const json = await chatService.getChats(req.username);
    if (!json) {
        return res.status(401).json({"title": "error of some kind"});
    }
    res.json(json);
};

const getChat = async (req, res) => {
    const json = await chatService.getChat(req.username, req.params.id);
    if (!json) {
        return res.status(401).json({"title": "error of some kind"});
    }
    res.json(json);
};

const deleteChat = async (req, res) => {
    const json = await chatService.deleteChat(req.username, req.params.id);
    if (!json) {
        return res.status(401).json({"title": "error of some kind"});
    }
    res.json(json);
};

const getMessages = async (req, res) => {
    const json = await chatService.getMessages(req.username, req.params.id);
    if (!json) {
        return res.status(401).json({"title": "error of some kind"});
    }
    res.json(json);
};

const sendMessage = async (req, res) => {
    const json = await chatService.sendMessage(req.username, req.params.id, req.body.msg);
    if (!json) {
        return res.status(401).json({"title": "error of some kind"});
    }
    res.json(json);
};

module.exports = {createChat, getChats, getChat, deleteChat, sendMessage, getMessages};