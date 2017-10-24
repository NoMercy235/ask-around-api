const router = require('express').Router();
const controller = require('./reply.controller');

// We should never allow any operation other than create and delete.
router.post('/:user/:question', controller.create);
router.delete('/:id', controller.remove);

module.exports = router;
