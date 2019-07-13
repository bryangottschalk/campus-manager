const router = require('express').Router();
const Student = require('../db/student');
//routes specific to students

router.get('/', async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      res.status(404).send("couldn't find student");
    } else {
      res.status(200).json(student);
    }
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newStudent = await Student.create(req.body);
    res.json(newStudent);
  } catch (err) {
    console.log('error posting student');
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
  console.log('in the route');
  try {
    const student = await Student.findByPk(req.body.id);
    await student.setCampus(null);
    res.sendStatus(200);
  } catch (err) {
    console.log('error unregistering student');
  }
});

router.put('/:id/edit', async (req, res, next) => {
  try {
    const studentToUpdate = await Student.findByPk(req.params.id);
    await studentToUpdate.update(req.body);
    res.json(studentToUpdate);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
