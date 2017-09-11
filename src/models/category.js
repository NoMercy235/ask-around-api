const MODEL = 'Category';

let mongoose = require('mongoose');
let schema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
});

module.exports = {
    model: mongoose.model(MODEL, schema),
    key: MODEL
};
