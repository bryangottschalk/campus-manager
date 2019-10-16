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
  for (let i = 0; i < 299; i++) {
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
      campusId: faker.random.number({ min: 2, max: 30 }), //campusId 1 reserved to not have any students enrolled
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
    imageUrl: '/images/campuses/1.jpg',
    description: faker.lorem.sentence(),
  });

  for (let i = 0; i < 29; i++) {
    campuses.push({
      name: faker.company.companyName(),
      address: faker.address.streetAddress(),
      imageUrl: `/images/campuses/${Math.ceil(Math.random() * 5)}.jpg`,
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
    await Promise.all(campuses.map(campus => Campus.create(campus)));
    await Promise.all(students.map(student => Student.create(student)));
    console.log('Database was successfully seeded!');
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;

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
