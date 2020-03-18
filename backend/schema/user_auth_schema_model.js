const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userschema = new schema({
    username: String,
    password: String,
    email: String,
    fname: String,
    lname: String
}, {versionKey: false});

module.exports = mongoose.model('usercredential', userschema);