let BaseController = require('../common/base.controller');
let User = require('../../models/user').model;
let UserPreference = require('../../models/user-preference').model;
let constants = require('../common/constants');

const findByCb = function (req) {
    return { email: req.params.email }
};

const userController = new BaseController(User, findByCb);

userController.callbacks[constants.HTTP_TIMED_EVENTS.BEFORE_GET_ONE].push((query) => {
    query.populate([
        { path: 'questions', select: [ 'title', 'content', 'created_at' ] },
        { path: 'user_preference', select: [ 'ignored_keywords', 'ignored_categories' ] },
    ]);
});

userController.callbacks[constants.HTTP_TIMED_EVENTS.AFTER_CREATE].push((res, item) => {
    let userPreference = UserPreference({
        user: item._id,
        ignored_categories: [],
        ignored_keywords: [],
    });
    userPreference.save().catch((err) => {
        res.status(constants.HTTP_CODES.BAD_REQUEST).json(err);
    });
    item.user_preference = userPreference._id;
    item.save().catch((err) => {
        res.status(constants.HTTP_CODES.BAD_REQUEST).json(err);
    });
});

module.exports = {
    get: userController.get(),
    getOne: userController.getOne(),
    create: userController.create(),
    update: userController.update(),
    remove: userController.remove(),
};