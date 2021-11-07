const Student = require("../models/student.model");
const CourseResolver = require("../resolvers/course.resolver");

//
// GET all students
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
    const courseId = req.params.courseid;
    console.log(`req.params->`, req.params)
    console.log(`courseId->`, courseId)
    const allStudentsInCourse = await Student.find({ courses: courseId });
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
    const image = req.file ? req.file.path : null

    if (courses) {
      await CourseResolver.existCourses(courses);
    } else {
      courses = [];
    }

    const updatedStudent = await Student.findByIdAndUpdate(id, {
      name,
      surname,
      address,
      email,
      courses,
      image,
    });
    return res.status(200).json(updatedStudent);

  } catch (error) {
    return next(error);
  }
};

//
// PATH - Include a new course in a student
//
const newCourseInStudent = async (req, res, next) => {
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
const removeCourseInStudent = async (req, res, next) => {
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
// PATH - Update just the image of a student
//
const updateImageStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const image = req.file ? req.file.path : null

    if (image) {
      const updatedStudent = await Student.findByIdAndUpdate(id, {image});
      return res.status(200).json(updatedStudent);
    } else {
      const error = new Error();
      error.message="The image name is not valid";
      error.status=400;
      return next(error);
    }

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
  newCourseInStudent,
  removeCourseInStudent,
  updateImageStudent,
  deleteStudent,
};
