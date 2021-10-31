const studentRouter = require('express').Router();
const { getAllStudents, getStudentById, postNewStudent, pathNewCourseInStudent } = require('../controllers/student.controller');

studentRouter.get('/', getAllStudents);
studentRouter.get('/:id', getStudentById);
studentRouter.post('/', postNewStudent);
studentRouter.patch('/newcourse/:id', pathNewCourseInStudent);

module.exports = studentRouter;