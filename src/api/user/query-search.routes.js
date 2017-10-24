let router = require('express').Router();
let controller = require('./query-search.controller');

// Expose the post to create them if they don't exist and put to update the existing ones.
router.post('/', controller.create);
router.put('/:id', controller.update);

module.exports = router;
