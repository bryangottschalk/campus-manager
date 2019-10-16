const router = require('express').Router();
const Student = require('../db/student');
const Campus = require('../db/campus');

router.get('/', async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { firstName, lastName, email, imageUrl, gpa } = req.body;
    const newStudent = await Student.create({
      firstName,
      lastName,
      email,
      imageUrl,
      gpa,
    });
    res.json(newStudent);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id, {
      include: [{ model: Campus }],
    });
    if (!student) {
      const err = new Error("couldn't find student");
      err.status = 404;
      throw err;
    } else {
      res.status(200).json(student);
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Student.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.body.id);
    if (!student) {
      const err = new Error("couldn't find student to update");
      err.status = 404;
      throw err;
    } else {
      await student.setCampus(null);
      res.sendStatus(200);
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:id/edit', async (req, res, next) => {
  const { firstName, lastName, email, imageUrl, gpa, id, campusId } = req.body;
  try {
    const studentToUpdate = await Student.findByPk(req.params.id);
    if (!studentToUpdate) {
      const err = new Error("couldn't find student to update");
      err.status = 404;
      throw err;
    } else {
      await studentToUpdate.update({
        firstName,
        lastName,
        email,
        imageUrl,
        gpa,
        id,
        campusId,
      });
      res.json(studentToUpdate);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
