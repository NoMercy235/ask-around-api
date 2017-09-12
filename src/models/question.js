let moment = require('moment');
let USER = require('./user').key;
let CATEGORY = require('./category').key;
let QUESTION_SCORE = require('./question-score').key;

const MODEL = 'Question';

let mongoose = require('mongoose');
let schema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    created_at: { type: Date },

    _creator: { type: String, ref: USER },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: CATEGORY }],
    scores: [{ type: mongoose.Schema.Types.ObjectId, ref: QUESTION_SCORE }],
});

schema.pre('save', function (next) {
    if (!this.created_at) this.created_at = moment().format();
    next();
});

module.exports = {
    model: mongoose.model(MODEL, schema),
    key: MODEL
};
