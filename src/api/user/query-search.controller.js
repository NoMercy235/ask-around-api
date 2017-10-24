let BaseController = require('../common/base.controller');
let QuerySearch = require('../../models/query-search').model;

const findByCb = function (req) {
    return { _id: req.params.id }
};

const querySearchController = new BaseController(QuerySearch, findByCb);

module.exports = {
    get: querySearchController.get(),
    getOne: querySearchController.getOne(),
    create: querySearchController.create(),
    update: querySearchController.update(),
    remove: querySearchController.remove(),
};
