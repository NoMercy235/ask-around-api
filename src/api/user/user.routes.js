let router = require('express').Router();
let controller = require('./user.controller');

// TODO: route middleware to verify a token

router.get('/', controller.getBase);
router.get('/user', controller.getUsers);
router.post('/user', controller.saveUser);

module.exports = router;
