const MODEL_NAMES = require('./model-names');
const USER = MODEL_NAMES.user;
const QUESTION = MODEL_NAMES.question;
const MODEL = MODEL_NAMES.questionScore;

const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    score: { type: Number, required: true },

    user: { type: String, ref: USER },
    question: { type: String, ref: QUESTION },
});

module.exports = {
    model: mongoose.model(MODEL, schema),
    key: MODEL,
};
