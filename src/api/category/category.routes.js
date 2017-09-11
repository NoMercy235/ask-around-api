let router = require('express').Router();
let controller = require('./categories.controller');

router.get('/', controller.get);
router.post('/', controller.create);
router.get('/:id', controller.getOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
