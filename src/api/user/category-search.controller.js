let BaseController = require('../common/base.controller');
let CategorySearch = require('../../models/category-search').model;

const findByCb = function (req) {
    return { _id: req.params.id }
};

const categorySearchController = new BaseController(CategorySearch, findByCb);

module.exports = {
    get: categorySearchController.get(),
    getOne: categorySearchController.getOne(),
    create: categorySearchController.create(),
    update: categorySearchController.update(),
    remove: categorySearchController.remove(),
};
