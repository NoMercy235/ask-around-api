let BaseController = require('../common/base.controller');
let Question = require('../../models/question');
let User = require('../../models/user');
let constants = require('../common/constants');

const findByCb = function (req) {
    return { _id: req.params.id }
};

const questionController = new BaseController(Question, findByCb);

questionController.callbacks[constants.HTTP_TIMED_EVENTS.AFTER_CREATE].push((res, item) => {
    User.findOne({ _id: item._creator }, (err, user) => {
        if (err) {
            res.status(constants.HTTP_CODES.BAD_REQUEST).send(err);
            return;
        }
        user.questions.push(item);
        user.save();
    })
});

module.exports = {
    get: questionController.get(),
    getOne: questionController.getOne(),
    create: questionController.create(),
    update: questionController.update(),
    remove: questionController.remove(),
};