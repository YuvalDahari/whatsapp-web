const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Message = new Schema({
    created: { type: Date, default: Date.now },
    sender: { type: ObjectId, ref: 'User' },
    content: { type: String, required: true }
});

module.exports = mongoose.model('Message', Message);