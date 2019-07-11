const router = require('express').Router();
const Student = require('../db/student');
//routes specific to students

router.get('/', async (req, res, next) => {
  try {
    console.log('in the /students get req');
    const students = await Student.findAll();
    // console.log('ALL STUDENTS DATA', students);
    res.json(students);
  } catch (err) {
    next(err);
  }
});

//Work on this tomorrow and delete commented code below
router.get('/:id', async (req, res, next) => {
  console.log('matched /studentId route!');

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

module.exports = router;
