let BaseController = require('../common/base.controller');
let QuestionScore = require('../../models/question-score').model;
let Question = require('../../models/question').model;
let constants = require('../common/constants');

const findByCb = function (req) {
    return { _id: req.params.id, user: req.params.user, question: req.params.question }
};

const questionScoresController = new BaseController(QuestionScore, findByCb);

questionScoresController.callbacks[constants.HTTP_TIMED_EVENTS.BEFORE_CREATE].push((req, item) => {
    item.user = req.params.user;
    item.question = req.params.question;
});

questionScoresController.callbacks[constants.HTTP_TIMED_EVENTS.AFTER_CREATE].push((res, item) => {
    Question.findOne({ _id: item.question }).exec().then((question) => {
        question.scores.push(item);
        question.save().catch((err) => {
            res.status(constants.HTTP_CODES.BAD_REQUEST);
        });
    }).catch((err) => {
        res.status(constants.HTTP_CODES.INTERNAL_SERVER_ERROR);
    });
});

questionScoresController.callbacks[constants.HTTP_TIMED_EVENTS.BEFORE_GET].push((query) => {
    query.populate([
        { path: 'user', select: [ 'email', 'firstName', 'lastName' ] },
        { path: 'question', select: [ 'title', 'content' ] },
    ]);
});

module.exports = {
    get: questionScoresController.get(),
    getOne: questionScoresController.getOne(),
    create: questionScoresController.create(),
    update: questionScoresController.update(),
    remove: questionScoresController.remove(),
};
