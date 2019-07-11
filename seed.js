const { green, red } = require('chalk');
const { db } = require('./server/db');

const Campus = require('./server/db/campus');
const Student = require('./server/db/student');

// commented these out to debug
const campuses = [
  {
    name: 'fullstack',
    address: '12',
    imageUrl:
      'https://cloud.fullstackacademy.com/fullstack-academy-logo-color-on-white.png?mtime=20160802141645',
    description:
      'Fullstack Academy is an immersive software engineering coding bootcamp located in New York City and Chicago. Students of the full-time flagship course learn full stack JavaScript over the course of a 13-week, on-campus program.',
  },
  {
    name: 'gracehopper',
    address: '34',
    imageUrl:
      'https://cdn-images-1.medium.com/max/1600/1*Z4KQVqvrFs2FQjJTcLvmNw.png',
    description:
      'The Grace Hopper Program at Fullstack Academy is an immersive software engineering course for women with no upfront tuition cost.',
  },
  {
    name: 'flatiron',
    address: '56',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/61/FS_wiki.png',
    description:
      'Flatiron School is an educational organization founded in 2012 by Adam Enbar and Avi Flombaum. The organization is based in New York City and teaches software engineering, computer programming, data science, and UX/UI design.',
  },
  {
    name: 'hack reactor',
    address: '78',
    imageUrl:
      'http://hrhqdir.s3.amazonaws.com/brand-guide/HackReactor_RGBLogo-Gray-Blue.png',
    description:
      'Hack Reactor is a software engineering Coding Bootcamp education program founded in San Francisco by Anthony Phillips, Shawn Drost, Marcus Phillips, and Douglas Calhoun in 2012.',
  },
];

const students = [
  {
    firstName: 'Bryan',
    lastName: 'Gottschalk',
    email: 'bryan@email.com',
    imageUrl: 'https://robohash.org/Bryan',
    gpa: '2.0',
    campusId: 1,
  },
  {
    firstName: 'Kayla',
    lastName: 'Varacalli',
    email: 'kayla@email.com',
    imageUrl: 'https://robohash.org/Kayla',
    gpa: '3.5',
    campusId: 1,
  },
  {
    firstName: 'Ali',
    lastName: 'Gottschalk',
    email: 'ali@email.com',
    imageUrl: 'https://robohash.org/Alison',
    gpa: '4.0',
  },
  {
    firstName: 'Stephen',
    lastName: 'Bott',
    email: 'stephen@email.com',
    imageUrl: 'https://robohash.org/Stephen',
    gpa: '3.0',
  },
];

const seed = async () => {
  try {
    // await db.sync({ force: true });
    await db.sync({ force: true });
    await Promise.all(campuses.map(campus => Campus.create(campus))); // seed attempts
    await Promise.all(students.map(student => Student.create(student)));
    console.log('Database was successfully seeded!');
    // db.close();
    // seed your database here!
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

// #### Seed Requirement
// - [ ] Running the seed file creates campuses and students for demonstration purposes
