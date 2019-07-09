const router = require('express').Router();
const Campus = require('../db/campus');
//routes specific to campuses

router.get('/', async (req, res, next) => {
  try {
    const campuses = await Campus.findAll();
    res.json(campuses);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
