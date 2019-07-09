const Sequelize = require('sequelize');
const db = require('./database');

const Student = db.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'http://',
  },
  gpa: {
    type: Sequelize.INTEGER,
    validate: { min: 0, max: 4, isFloat: true },
  },
});

/*
// Student.beforeValidate(student => {
//   if (student.gpa > 4) {
//     const err = new Error('Validation max on gpa');
//     throw err;
//   } else if (student.gpa < 0) {
//     const err = new Error('Validation min on gpa');
//     throw err;
//   }
// });
*/

module.exports = Student;
