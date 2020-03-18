const mongoose = require('mongoose');
const Schema = mongoose.Schema;

post_schema = new Schema({
    date: Number,
    user_id: String,
    username: String,
    title: String,
    category: String,
    filename: String,
    mimetype: String,
    comments: Array
}, {versionKey: false})

module.exports = mongoose.model('post', post_schema);