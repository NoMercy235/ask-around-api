let USER = require('./user').key;
let QUESTION = require('./question').key;

const MODEL = 'QuestionScore';

let mongoose = require('mongoose');
let schema = new mongoose.Schema({
    score: { type: Number, required: true },

    user: { type: String, ref: USER },
    question: { type: String, ref: QUESTION },
});

module.exports = {
    model: mongoose.model(MODEL, schema),
    key: MODEL
};
