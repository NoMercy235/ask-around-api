let BaseController = require('../common/base.controller');
let Question = require('../../models/question').model;
let User = require('../../models/user').model;
let Category = require('../../models/category').model;
let constants = require('../common/constants');

const findByCb = function (req) {
    return { _id: req.params.id }
};

const questionController = new BaseController(Question, findByCb);

questionController.callbacks[constants.HTTP_TIMED_EVENTS.AFTER_CREATE].push((res, item) => {
    User.findOne({ _id: item._creator }).exec().then((user) => {
        user.questions.push(item);
        user.save().catch((err) => {
            res.status(constants.HTTP_CODES.BAD_REQUEST);
        });
    }).catch((err) => {
        res.status(constants.HTTP_CODES.INTERNAL_SERVER_ERROR);
    });

    item.categories.map((category) => {
        Category.findOne({ _id: category}).exec().then((category) => {
            category.questions.push(item);
            category.save().catch((err) => {
                res.status(constants.HTTP_CODES.BAD_REQUEST);
            });
        }).catch((err) => {
            res.status(constants.HTTP_CODES.INTERNAL_SERVER_ERROR);
        });
    })
});

questionController.callbacks[constants.HTTP_TIMED_EVENTS.BEFORE_GET_ONE].push((query) => {
    query.populate({ path: '_creator', select: [ 'email', 'firstName', 'lastName' ] });
});

questionController.callbacks[constants.HTTP_TIMED_EVENTS.BEFORE_GET].push((query) => {
    query.populate([
        { path: '_creator', select: [ 'firstName', 'lastName' ] },
        { path: 'categories', select: [ 'name' ] },
        { path: 'score', select: [ 'score' ] },
        { path: 'replies', select: [ 'user', 'message' ] },
    ]);
});

module.exports = {
    get: questionController.get(),
    getOne: questionController.getOne(),
    create: questionController.create(),
    update: questionController.update(),
    remove: questionController.remove(),
};