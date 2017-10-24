let BaseController = require('../common/base.controller');
let Question = require('../../models/question').model;
let Reply = require('../../models/reply').model;
let constants = require('../common/constants');

const findByCb = function (req) {
    return { _id: req.params.id }
};

const replyController = new BaseController(Reply, findByCb);

replyController.callbacks[constants.HTTP_TIMED_EVENTS.BEFORE_CREATE].push((req, item) => {
    item.user = req.params.user;
    item.question = req.params.question;
});

replyController.callbacks[constants.HTTP_TIMED_EVENTS.AFTER_CREATE].push((res, item) => {
    Question.findOne({ _id: item.question }).exec().then((question) => {
        question.replies.push(item);
        question.save().catch((err) => {
            res.status(constants.HTTP_CODES.BAD_REQUEST).json(err);
        });
    }).catch((err) => {
        res.status(constants.HTTP_CODES.INTERNAL_SERVER_ERROR).json(err);
    });
});

module.exports = {
    get: replyController.get(),
    getOne: replyController.getOne(),
    create: replyController.create(),
    update: replyController.update(),
    remove: replyController.remove(),
};