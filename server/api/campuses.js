const router = require('express').Router();
const Campus = require('../db/campus');
const Student = require('../db/student');

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
    const { name, address, imageUrl, description } = req.body;
    const campusToUpdate = await Campus.findByPk(req.params.id);
    if (!campusToUpdate) {
      const err = new Error("couldn't find campus to update");
      err.status = 404;
      throw err;
    }
    await campusToUpdate.update({ name, address, imageUrl, description });
    res.json(campusToUpdate);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.id, {
      include: [{ model: Student }],
    });
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
    const { name, address, imageUrl, description } = req.body;
    const newCampus = await Campus.create({
      name,
      address,
      imageUrl,
      description,
    });
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
