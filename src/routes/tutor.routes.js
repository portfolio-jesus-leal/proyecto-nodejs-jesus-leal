const tutorRouter = require('express').Router();
const { getAllTutors, getTutorById, postNewTutor } = require('../controllers/tutor.controller');

tutorRouter.get('/', getAllTutors);
tutorRouter.get('/:id', getTutorById);
tutorRouter.post('/', postNewTutor);

module.exports = tutorRouter;