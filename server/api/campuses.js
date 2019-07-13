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

router.put('/:id/edit', async (req, res, next) => {
  try {
    const campusToUpdate = await Campus.findByPk(req.params.id);
    if (!campusToUpdate) {
      const err = new Error("couldn't find campus to update");
      err.status = 404;
      throw err;
    }
    await campusToUpdate.update(req.body);
    res.json(campusToUpdate);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.id);
    if (!campus) {
      const err = new Error("couldn't find campus");
      err.status = 404;
      throw err;
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
