const MODEL_NAMES = require('./model-names');
const USER = MODEL_NAMES.user;
const QUESTION = MODEL_NAMES.question;
const MODEL = MODEL_NAMES.reply;

const mongoose = require('mongoose');
const schema = new mongoose.Schema(
    {
        message: { type: String },

        user: { type: String, ref: USER },
        question: { type: String, ref: QUESTION },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
);

module.exports = {
    model: mongoose.model(MODEL, schema),
    key: MODEL
};
