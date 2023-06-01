const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const users = require('./routes/user');
const tokens = require('./routes/token');
const chats = require('./routes/chat');

require('custom-env').env(process.env.NODE_ENV, './config');

mongoose.connect(process.env.CONNECTION_STRING + '/' + process.env.DB_NAME,
    { useNewUrlParser: true, useUnifiedTopology: true });

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/Tokens', tokens);
app.use('/api/Users', users);
app.use('/api/Chats', chats);

app.listen(process.env.PORT)