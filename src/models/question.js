let moment = require('moment');

const MODEL = 'Question';

let mongoose = require('mongoose');
let schema = new mongoose.Schema({
    _creator: { type: String, ref: 'User' },
    title: { type: String, required: true },
    content: { type: String, required: true },
    created_at: { type: Date },
});

schema.pre('save', function (next) {
    if (!this.created_at) this.created_at = moment().format();
    next();
});

module.exports = mongoose.model(MODEL, schema);
