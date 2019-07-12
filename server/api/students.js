const router = require('express').Router();
const Student = require('../db/student');
//routes specific to students

router.get('/', async (req, res, next) => {
  try {
    console.log('in the /students get req');
    const students = await Student.findAll();
    res.json(students);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findByPk(studentId);
    console.log('DATA', student);
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

module.exports = router;
