const MODEL_NAMES = require('./model-names');
const USER = MODEL_NAMES.user;
const MODEL = MODEL_NAMES.categorySearch;

const mongoose = require('mongoose');
const schema = new mongoose.Schema({
        query: { type: String, required: true },
        times: { type: Number, required: true },

        user: { type: String, ref: USER, required: true },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
);

module.exports = {
    model: mongoose.model(MODEL, schema),
    key: MODEL
};
