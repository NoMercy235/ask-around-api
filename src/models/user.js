const MODEL = 'User';

let mongoose = require('mongoose');
let schema = new mongoose.Schema({
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
});

schema.path('email').validate(function (value, done) {
    this.model(MODEL).count({ email: value }, (err, count) => {
        if (err) {
            return done(err);
        }
        done(!count);
    })
}, 'Email already exists');

module.exports = mongoose.model(MODEL, schema);
