const MODEL_NAMES = require('./model-names');
const QUESTION = MODEL_NAMES.question;
const MODEL = MODEL_NAMES.category;

const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },

    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: QUESTION }],
});

schema.path('name').validate(function (value) {
    return value && value.length >= 10 && value.length <= 100;
}, 'Name must be have at between 10 and 100 characters.');

schema.path('description').validate(function (value) {
    return value && value.length <= 2000;
}, 'Name must be have less then 2000 characters.');

module.exports = {
    model: mongoose.model(MODEL, schema),
    key: MODEL
};
