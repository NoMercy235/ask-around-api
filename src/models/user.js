const bcrypt = require('bcrypt');
const MODEL_NAMES = require('./model-names');
const QUESTION = MODEL_NAMES.question;
const MODEL = MODEL_NAMES.user;

const SALT_WORK_FACTOR = 10;

const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: QUESTION }],
});

schema.pre('save', function (next) {
    if (!this.isModified('password')) {
        console.log('called next because password is not modified');
        return next();
    }
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

schema.statics.updateFields = function (fields) {
    // Deleting the password to prevent updating the hash on user update.
    // There will be a separate API call for password update.
    if (fields['password']) delete fields['password'];

    // TODO: check how to ignore fields which shouldn't be updated
    if (fields['email']) delete fields['email'];

    let res = {};
    for (let key in fields) {
        if (fields.hasOwnProperty(key)) {
            res[key] = fields[key];
        }
    }
    return res;
};

schema.path('email').validate({
    isAsync: true,
    validator: function (value, done) {
        if (this._id) done();
        this.model(MODEL).count({ email: value }, (err, count) => {
            if (err) {
                return done(err);
            }
            done(!count);
        })
    },
    message: 'Email already exists',
});

schema.path('password').validate(function (value) {
    return value && value.length >= 6;
}, 'Password must be have at least 6 characters');

module.exports = {
    model: mongoose.model(MODEL, schema),
    key: MODEL
};
