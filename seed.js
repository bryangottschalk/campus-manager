const { green, red } = require('chalk');
const { db } = require('./server/db');
const faker = require('faker');
const Campus = require('./server/db/campus');
const Student = require('./server/db/student');

function generateFakeStudents() {
  let students = [];
  //push one student without a campusid for test spec
  students.push({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: `notenrolledatacampus@example.org`,
    imageUrl: 'http://robohash.org/unenrolledstudent',
    gpa: faker.random
      .number({
        min: 0,
        max: 4,
        precision: 0.1,
      })
      .toFixed(1),
    //campusId 1 reserved to not have any students enrolled
    campusId: null,
  });
  for (let i = 0; i < 999; i++) {
    //so email address can be based on their name
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    students.push({
      firstName: firstName,
      lastName: lastName,
      email: `${firstName}.${lastName}@example.org`,
      imageUrl: faker.image.avatar(),
      gpa: faker.random
        .number({
          min: 0,
          max: 4,
          precision: 0.1,
        })
        .toFixed(1),
      campusId: faker.random.number({ min: 2, max: 100 }), //campusId 1 reserved to not have any students enrolled
    });
  }
  return students;
}

function generateFakeCampuses() {
  let campuses = [];
  //push one campus with no students for test spec
  campuses.push({
    name: faker.company.companyName(),
    address: faker.address.streetAddress(),
    imageUrl: faker.random.image(),
    description: faker.lorem.paragraph(),
  });

  for (let i = 0; i < 99; i++) {
    campuses.push({
      name: faker.company.companyName(),
      address: faker.address.streetAddress(),
      imageUrl: faker.random.image(),
      description: faker.lorem.paragraph(),
    });
  }
  return campuses;
}

const campuses = generateFakeCampuses();
const students = generateFakeStudents();

const seed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all(campuses.map(campus => Campus.create(campus))); // seed attempts
    await Promise.all(students.map(student => Student.create(student)));
    console.log('Database was successfully seeded!');
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'));
      db.close();
    })
    .catch(err => {
      console.error(red('Oh noes! Something went wrong!'));
      console.error(err);
      db.close();
    });
}
