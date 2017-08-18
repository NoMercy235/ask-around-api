let router = require('express').Router();
let controller = require('./user.controller');

router.get('/', controller.getUsers);
router.post('/user', controller.saveUser);

module.exports = router;
