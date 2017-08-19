let BaseController = require('../common/base.controller');
let User = require('../../models/user');
let constants = require('../common/constants');

const findByCb = function (req) {
    return { email: req.params.email }
};

const userController = new BaseController(User, findByCb);

userController.events.on(constants.HTTP_TIMED_EVENTS.BEFORE_GET, () => {
    console.log('before get');
});

module.exports = {
    get: userController.get(),
    getOne: userController.getOne(),
    create: userController.create(),
    update: userController.update(),
    remove: userController.remove(),
};