const MODEL = 'User';

let mongoose = require('mongoose');
let schema = new mongoose.Schema({
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
});
let bcrypt = require('bcrypt');
let SALT_WORK_FACTOR = 10;

schema.pre('save', function (next) {
    if (!this.isModified('password')) return next();
    try {
        this.password = bcrypt.hashSync(this.password, SALT_WORK_FACTOR);
        next();
    } catch (err) {
        next(err);
    }
});

schema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
};

schema.path('email').validate(function (value, done) {
    this.model(MODEL).count({ email: value }, (err, count) => {
        if (err) {
            return done(err);
        }
        done(!count);
    })
}, 'Email already exists');

module.exports = mongoose.model(MODEL, schema);
