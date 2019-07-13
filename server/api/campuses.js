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

// router.get('/:id/edit', async (req, res, next) => {
//   try {
//     console.log('in the update form get request');
//     res.sendStatus(300);
//   } catch (err) {
//     next(err);
//   }
// });

router.put('/:id/edit', async (req, res, next) => {
  try {
    console.log('in the campuses put request');
    console.log('req.body', req.body);
    console.log('id passed to .put route at /campuses:id/edit', req.params.id);
    const campusToUpdate = await Campus.findByPk(req.params.id);
    await campusToUpdate.update(req.body);
    // res.sendStatus(200);
    res.json(campusToUpdate);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.id);
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
