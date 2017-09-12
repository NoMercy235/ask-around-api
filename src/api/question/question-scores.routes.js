let router = require('express').Router();
let controller = require('./question-scores.controller');

router.get('/:user/:question', controller.get);
router.post('/:user/:question', controller.create);
router.get('/:user/:question/:id', controller.getOne);
router.put('/:user/:question/:id', controller.update);
router.delete('/:user/:question/:id', controller.remove);

module.exports = router;
