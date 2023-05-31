const express = require('express');
var router = express.Router();
//const userController = require('../controllers/user');

router.route('/')
    .post(() => {console.log("new chat");})
    .get(() => {console.log("get chats");});

router.route('/:id')
    .delete(() => {console.log("delete specific chat");})
    .get(() => {console.log("get specific chat");});

router.route('/:id/Messages')
    .post(() => {console.log("new message");})
    .get(() => {console.log("get chat messages array");});

module.exports = router;