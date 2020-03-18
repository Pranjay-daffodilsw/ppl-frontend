const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cat_schema = new Schema({
    categoryname: String,
    thumbnail: String
}, {versionKey: false});

module.exports = mongoose.model('category', cat_schema);