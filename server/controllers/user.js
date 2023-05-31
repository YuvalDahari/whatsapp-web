const userService = require('../services/user')
const jwt = require("jsonwebtoken")

const createUser = async (req, res) => {
    // check fields
    errors = {
        "errors": [],
        "title": "One or more validation errors occurred."
    }
    if (!req.body.username) {
        errors.errors.push('Username is required');
    }
    if (!req.body.password) {
        errors.errors.push('Password is required');
    }
    if (!req.body.displayName) {
        errors.errors.push('DisplayName is required');
    }
    if (!req.body.profilePic) {
        errors.errors.push('ProfilePic is required');
    }
    if (errors.errors.length > 0) {
        return res.status(400).json(errors);
    }

    const json = await userService.createUser(req.body.username, req.body.password, req.body.displayName, req.body.profilePic);
    if (!json) {
        return res.status(409).json({"title": "Conflict"});
    }
    res.end();
};

const getUserByUsername = async(req, res) => {
    if (req.params.username != req.username) {
        return res.status(401).json("Not authorized!");
    }
    const data = await userService.getUserByUsername(req.username);
    res.json([data].map(({username, displayName, profilePic}) => ({username, displayName, profilePic}))[0]);
};

const getToken = async(req, res) => {
    errors = {
        "errors": [],
        "title": "One or more validation errors occurred."
    }
    if (!req.body.username) {
        errors.errors.push('Username is required');
    }
    if (!req.body.password) {
        errors.errors.push('Password is required');
    }
    if (errors.errors.length > 0) {
        return res.status(400).json(errors);
    }

    const token = await userService.tryLogin(req.body.username, req.body.password);
    if (!token) {
        return res.status(401).json({"title": "Wrong password ..."});
    }

    res.end(token);
};


const isLoggedIn = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        try {
            const data = jwt.verify(token, process.env.TOKEN_KEY);
            req.username = data.username;
            return next()
        } catch (err) {
            console.log(err);
            return res.status(401).send("Invalid Token");
        }
    }
    else
        return res.status(403).send('Token required');
}

module.exports = {createUser, getUserByUsername, getToken, isLoggedIn};