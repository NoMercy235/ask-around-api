let router = require('express').Router();
let controller = require('./user-preference.controller');

router.put('/:user/:id', controller.update);

module.exports = router;
