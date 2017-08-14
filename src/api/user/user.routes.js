let router = require('express').Router();
let controller = require('./user.controller');

router.get('/', controller.getBase);
router.get('/user', controller.getUsers);
router.post('/user', controller.saveUser);

module.exports = router;
