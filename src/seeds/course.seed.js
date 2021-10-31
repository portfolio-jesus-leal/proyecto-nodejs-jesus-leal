const mongoose = require('mongoose');

const Course = require('../models/course.model');

require('dotenv').config();

const courses = [
  {
    title: 'Matemáticas',
    status: 'Open',
    startDate: '2022-01-01T00:00:00'
  },
];

// 1º: Vemos si hay datos en la BBDD
// 2º: Se hay datos, si borran todos de la colección
// 3º: Se insentan en la BBDD los datos del array

const courseDocuments = courses.map(course => new Course(course));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const allCourses = await Course.find();
    if (allCourses.length) {
      await Course.collection.drop(); 
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
		await Course.insertMany(courseDocuments);
    console.log('DatabaseCreated')
	})
  .catch((err) => console.log(`Error creating data: ${err}`))
  .finally(() => mongoose.disconnect());