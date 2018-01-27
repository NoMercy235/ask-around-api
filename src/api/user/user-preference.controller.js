let BaseController = require('../common/base.controller');
let UserPreference = require('../../models/user-preference').model;
let User = require('../../models/user').model;
let constants = require('../common/constants');

const findByCb = function (req) {
    return { _id: req.params.id, user: req.params.user }
};

const userPreferenceController = new BaseController(UserPreference, findByCb);

userPreferenceController.callbacks[constants.HTTP_TIMED_EVENTS.BEFORE_CREATE].push((req, item) => {
    item.user = req.params.user;
});

userPreferenceController.callbacks[constants.HTTP_TIMED_EVENTS.AFTER_CREATE].push((res, item) => {
    User.findOne({ _id: item.user }).exec().then((user) => {
        user.user_preference = item;
        user.save().catch((err) => {
            res.status(constants.HTTP_CODES.BAD_REQUEST);
        });
    }).catch((err) => {
        res.status(constants.HTTP_CODES.INTERNAL_SERVER_ERROR);
    });
});

module.exports = {
    get: userPreferenceController.get(),
    getOne: userPreferenceController.getOne(),
    create: userPreferenceController.create(),
    update: userPreferenceController.update(),
    remove: userPreferenceController.remove(),
};
