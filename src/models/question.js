const MODEL = 'Question';

let mongoose = require('mongoose');
let schema = new mongoose.Schema({
    _creator: { type: String, ref: 'User' },
    title: { type: String, required: true },
    content: { type: String, required: true },
});

module.exports = mongoose.model(MODEL, schema);
