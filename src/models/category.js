let QUESTION = require('./question').key;

const MODEL = 'Category';

let mongoose = require('mongoose');
let schema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },

    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: QUESTION }],
});

module.exports = {
    model: mongoose.model(MODEL, schema),
    key: MODEL
};
