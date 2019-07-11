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

router.get('/:id', async (req, res, next) => {
  console.log('matched /campusId route!');

  try {
    const campusId = req.params.id;
    const campus = await Campus.findByPk(campusId);
    console.log('DATA', campus);
    if (!campus) {
      res.status(404).send("couldn't find campus");
    } else {
      res.status(200).json(campus);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
