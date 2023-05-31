const User = require('../models/user')
const jwt = require("jsonwebtoken")

const createUser = async (username, password, displayName, profilePic) => {
    const user = await getUserByUsername(username);
    if (!user) {
        const user = new User({
            username,
            password,
            displayName,
            profilePic
        });
        return await user.save();
    } return false
};

const getUserByUsername = async (username) => {
    return await User.findOne({ username: username });
};

const tryLogin = async (username, password) => {
    const user = await User.findOne({ username: username, password: password });
    if (!user) {
        return false;
    }

    // if sucess
    const data = { username: username }
    const token = jwt.sign(data, process.env.TOKEN_KEY)
    return token;
};


module.exports = { createUser, getUserByUsername, tryLogin };