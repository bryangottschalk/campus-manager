// bring DB together with models and associations

const db = require('./database');
const Student = require('./student');
const Campus = require('./campus');

Campus.hasMany(Student);
Student.belongsTo(Campus);

module.exports = {
  db,
  Student,
  Campus,
};
