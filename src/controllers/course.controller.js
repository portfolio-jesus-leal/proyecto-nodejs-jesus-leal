const Course = require("../models/course.model");
const TutorResolver = require("../resolvers/tutor.resolver");
const StudentResolver = require("../resolvers/student.resolver");

//
// GET all courses
//
const getAllCourses = async (req, res, next) => {
  try {
    const find = Course.find();
    const query = req.query.extended ? find.populate("tutor") : find;
    allCourses = await query;
    return res.status(200).json(allCourses);
  } catch (error) {
    return next(error);
  }
};

//
// GET courses by status
//
const getCoursesByStatus = async (req, res, next) => {
  try {
    const status = req.params.status;
    const find = Course.find({ status: status });
    const query = req.query.extended ? find.populate("tutor") : find;
    allCourses = await query;
    console.log("allCourses -> ", allCourses);
    return res.status(200).json(allCourses);
  } catch (error) {
    return next(error);
  }
};

//
// GET all the courses with a specific tutor
//
const getCoursesByTutor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const allCoursesByTutor = await Course.find({ tutor: id });
    return res.status(200).json(allCoursesByTutor);
  } catch (error) {
    return next(error);
  }
};

//
// GET a course by Id
//
const getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate("tutor");
    return res.status(200).json(course);
  } catch (error) {
    return next(error);
  }
};

//
// POST - Create a new course
//
const postNewCourse = async (req, res, next) => {
  try {
    const { title, status, startDate, tutor } = req.body;
    const newCourse = new Course({
      title: title,
      status: status,
      startDate: startDate,
    });

    if (tutor) {
      TutorResolver.existsById(tutor);
      newCourse.tutor = tutor;
    }

    const newCourseInDB = await newCourse.save();
    res.status(201).json(newCourseInDB);
  } catch (error) {
    return next(error);
  }
};

//
// PUT - Update a course
//
const updateCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, status, startDate, tutor } = req.body;

    if (tutor) {
      TutorResolver.existsById(tutor);
    }

    const updatedCourse = await Course.findByIdAndUpdate(id, {
      title,
      status,
      startDate,
      tutor,
    });
    return res.status(200).json(updatedCourse);
  } catch (error) {
    return next(error);
  }
};

//
// PATH - Update just the title attribute
//
const pathUpdateTitle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const title = req.body.title;
    const updateCourseWithTitle = await Course.findByIdAndUpdate(id, {
      $set: { title: title },
    });
    return res.status(200).json(updateCourseWithTitle);
  } catch (error) {
    return next(error);
  }
};

//
// PATH - Update just the tutor attribute
//
const pathUpdateTutor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tutor = req.body.tutor;

    TutorResolver.existsById(tutor);

    const updateCourseWithTutor = await Course.findByIdAndUpdate(id, {
      $set: { tutor: tutor },
    });
    return res.status(200).json(updateCourseWithTutor);
  } catch (error) {
    return next(error);
  }
};

//
// PATH - Update just the start date attribute
//
const pathUpdateStartDate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const startDate = req.body.start_date;
    const updateCourseWithStartDate = await Course.findByIdAndUpdate(id, {
      $set: { startDate: startDate },
    });
    return res.status(200).json(updateCourseWithStartDate);
  } catch (error) {
    return next(error);
  }
};

//
// PATH - Update just the status attribute
//
const pathUpdateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const status = req.body.status;
    const updateCourseWithStatus = await Course.findByIdAndUpdate(id, {
      $set: { status: status },
    });
    return res.status(200).json(updateCourseWithStatus);
  } catch (error) {
    return next(error);
  }
};

//
// DELETE Course
//
const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const students = await StudentResolver.findByCourse( id );

    if (students.length) {
      const error = new Error();
      error.message="Course has linked students, unlink them first before deleting course";
      error.status=400;
      return next(error);
    }      

    const course = await Course.findByIdAndDelete(id);
    return res.status(200).json(course);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllCourses,
  getCoursesByStatus,
  getCoursesByTutor,
  getCourseById,
  postNewCourse,
  deleteCourse,
  updateCourseById,
  pathUpdateTitle,
  pathUpdateTutor,
  pathUpdateStartDate,
  pathUpdateStatus,
};
