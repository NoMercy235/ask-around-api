let BaseController = require('../common/base.controller');
let Category = require('../../models/category').model;

const findByCb = function (req) {
    return { _id: req.params.id }
};

const categoryController = new BaseController(Category, findByCb);

module.exports = {
    get: categoryController.get(),
    getOne: categoryController.getOne(),
    create: categoryController.create(),
    update: categoryController.update(),
    remove: categoryController.remove(),
};
