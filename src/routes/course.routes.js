const cinemaRouter = require('express').Router();
const { getAllCourses, getCourseById, postNewCourse, deleteCourse, updateCourseById, pathNewTitle, pathNewTutor, pathNewStartDate } = require('../controllers/course.controller');

cinemaRouter.get('/', getAllCourses);
cinemaRouter.get('/:id', getCourseById);
cinemaRouter.post('/', postNewCourse);
cinemaRouter.delete('/', deleteCourse);
cinemaRouter.put('/:id', updateCourseById);
cinemaRouter.patch('/title/:id', pathNewTitle);
cinemaRouter.patch('/tutor/:id', pathNewTutor);
cinemaRouter.patch('/startdate/:id', pathNewStartDate);

module.exports = cinemaRouter;