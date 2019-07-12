const router = require('express').Router();
const Campus = require('../db/campus');
// routes specific to campuses
// don't forget to add error handling here!
router.get('/', async (req, res, next) => {
  try {
    const campuses = await Campus.findAll();
    res.json(campuses);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const campusId = req.params.id;
    const campus = await Campus.findByPk(campusId);
    if (!campus) {
      res.status(404).send("couldn't find campus");
    } else {
      res.status(200).json(campus);
    }
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newCampus = await Campus.create(req.body);
    res.json(newCampus);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Campus.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
