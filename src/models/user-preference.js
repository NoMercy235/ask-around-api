const MODEL_NAMES = require('./model-names');
const USER = MODEL_NAMES.user;
const MODEL = MODEL_NAMES.userPreference;

const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    ignored_categories: { type: [String] },
    ignored_keywords: { type: [String] },

    user: { type: String, ref: USER },
});

module.exports = {
    model: mongoose.model(MODEL, schema),
    key: MODEL
};
