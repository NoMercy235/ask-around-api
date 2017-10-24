const moment = require('moment');
const MODEL_NAMES = require('./model-names');
const USER = MODEL_NAMES.user;
const CATEGORY = MODEL_NAMES.category;
const QUESTION_SCORE = MODEL_NAMES.questionScore;
const REPLY = MODEL_NAMES.reply;
const MODEL = MODEL_NAMES.question;

const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    created_at: { type: Date },

    _creator: { type: String, ref: USER },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: CATEGORY }],
    scores: [{ type: mongoose.Schema.Types.ObjectId, ref: QUESTION_SCORE }],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: REPLY }],
});

schema.pre('save', function (next) {
    if (!this.created_at) this.created_at = moment().format();
    next();
});

module.exports = {
    model: mongoose.model(MODEL, schema),
    key: MODEL,
};
