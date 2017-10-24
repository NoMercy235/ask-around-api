const router = require('express').Router();
const controller = require('./user-preference.controller');

router.put('/:user/:id', controller.update);

module.exports = router;
