'use strict';

const router = require('express').Router();

// Any routes here are mounted on `/api`

router.use('/campuses', require('./campuses'));
router.use('/students', require('./students'));

// If someone makes a request that starts with `/api`, but there is no corresponding router, this piece of
// middleware will generate a 404, and send it to the error-handling endware

router.use((req, res, next) => {
  const err = new Error('API route not found!');
  err.status = 404;
  next(err);
});

module.exports = router;
