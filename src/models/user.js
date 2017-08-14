const MODEL = 'User';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;


module.exports = mongoose.model(MODEL, new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    isAdmin: Boolean
}));
