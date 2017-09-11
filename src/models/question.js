let moment = require('moment');
let USER = require('./user').key;

const MODEL = 'Question';

let mongoose = require('mongoose');
let schema = new mongoose.Schema({
    _creator: { type: String, ref: USER },
    title: { type: String, required: true },
    content: { type: String, required: true },
    created_at: { type: Date },
});

schema.pre('save', function (next) {
    if (!this.created_at) this.created_at = moment().format();
    next();
});

module.exports = {
    model: mongoose.model(MODEL, schema),
    key: MODEL
};
