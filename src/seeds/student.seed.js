const mongoose = require('mongoose');

const Student = require('../models/student.model');

require('dotenv').config();

const students = [
  {
    name: 'José',
    surname: 'Rodríguez',
    address: 'Calle 1, 1B, 28000',
    email: 'jose.rod@correos.es',
    genre: 'Accion',
  },
  {
    name: 'Pablo',
    surname: 'Muñoz',
    address: 'Calle 34, 7B, 28002',
    email: 'pablito@correos.es',
  },
  {
    name: 'María',
    surname: 'Jimenez',
    address: 'Calle Tristana 14, 28050',
    email: 'marij@correos.es',
  },
];

// 1º: Vemos si hay datos en la BBDD
// 2º: Se hay datos, si borran todos de la colección
// 3º: Se insentan en la BBDD los datos del array

const studentDocuments = students.map(student => new Student(student));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const allStudents = await Student.find();
    if (allStudents.length) {
      await Student.collection.drop(); 
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
		await Student.insertMany(studentDocuments);
    console.log('DatabaseCreated')
	})
  .catch((err) => console.log(`Error creating data: ${err}`))
  .finally(() => mongoose.disconnect());