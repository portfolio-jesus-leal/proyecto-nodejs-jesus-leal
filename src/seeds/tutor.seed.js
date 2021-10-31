const mongoose = require('mongoose');

const Tutor = require('../models/tutor.model');

require('dotenv').config();

const tutors = [
  {
    name: 'Javier',
    surname: 'Sánchez',
    email: 'tutor2021@correos.es',
  },
];

// 1º: Vemos si hay datos en la BBDD
// 2º: Se hay datos, si borran todos de la colección
// 3º: Se insentan en la BBDD los datos del array

const tutorDocuments = tutors.map(tutor => new Tutor(tutor));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const allTutors = await Tutor.find();
    if (allTutors.length) {
      await Tutor.collection.drop(); 
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
		await Tutor.insertMany(tutorDocuments);
    console.log('DatabaseCreated')
	})
  .catch((err) => console.log(`Error creating data: ${err}`))
  .finally(() => mongoose.disconnect());