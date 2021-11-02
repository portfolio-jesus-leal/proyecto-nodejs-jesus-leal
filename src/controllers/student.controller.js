const Student = require("../models/student.model");
const CourseResolver = require("../resolvers/course.resolver");

//
// GET all the students
//
const getAllStudents = async (req, res, next) => {
  try {
    const find = Student.find();
    const query = req.query.extended ? find.populate("courses") : find;
    const allStudents = await query;

    //const allStudents = await Student.find().populate('courses');
    return res.status(200).json(allStudents);
  } catch (error) {
    return next(error);
  }
};

//
// GET all the students in a course
//
const getStudentsByCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const allStudentsInCourse = await Student.find({ courses: id });
    return res.status(200).json(allStudentsInCourse);
  } catch (error) {
    return next(error);
  }
};

//
// GET a student by Id
//
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const students = await Student.findById(id).populate("courses");
    return res.status(200).json(students);
  } catch (error) {
    return next(error);
  }
};

//
// POST - Create a new student
//
const postNewStudent = async (req, res, next) => {
  const { name, surname, address, email, courses } = req.body;

  try {
    const newStudent = new Student({
      name: name,
      surname: surname,
      address: address,
      email: email,
      image: req.file ? req.file.path : null
    });

    if (courses) {
      CourseResolver.existCourses(courses);
      newStudent.courses = courses;
    }

    const newStudentInDB = await newStudent.save();

    //const { name, surname, address, email, courses } = req.body;
    //const newStudentInDB = await Course.create({ name, surname, address, email, courses });
    res.status(201).json(newStudentInDB);
  } catch (error) {
    return next(error);
  }
};

//
// PUT - Update a student
//
const updateStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, surname, address, email, courses } = req.body;

    if (courses) {
      await CourseResolver.existCourses(courses);
    }

    const updatedStudent = await Student.findByIdAndUpdate(id, {
      name,
      surname,
      address,
      email,
      courses,
    });
    return res.status(200).json(updatedStudent);
  } catch (error) {
    return next(error);
  }
};

//
// PATH - Include a new course in a student
//
const pathNewCourseInStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = req.body.course;
    const updateStudentWithCourse = await Student.findByIdAndUpdate(id, {
      $push: { courses: course },
    });
    return res.status(200).json(updateStudentWithCourse);
  } catch (error) {
    return next(error);
  }
};

//
// PATH - Remove a course from a student
//
const pathRemoveCourseInStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = req.body.course;
    const updateStudentWithoutCourse = await Student.findByIdAndUpdate(id, {
      $pull: { courses: course },
    });
    return res.status(200).json(updateStudentWithoutCourse);
  } catch (error) {
    return next(error);
  }
};

//
// DELETE Student
//
const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const student = await Student.findByIdAndDelete(id);
    return res.status(200).json(student);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllStudents,
  getStudentsByCourse,
  getStudentById,
  updateStudentById,
  postNewStudent,
  pathNewCourseInStudent,
  pathRemoveCourseInStudent,
  deleteStudent,
};
