const MODEL = 'User';

let mongoose = require('mongoose');
let schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    isAdmin: Boolean
});

schema.methods.isValid = function (cb) {
    return !!(this.email && this.password);
};

let model = mongoose.model(MODEL, schema);

module.exports = model;
