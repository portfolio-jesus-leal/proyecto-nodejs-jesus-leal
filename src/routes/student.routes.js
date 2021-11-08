const studentRouter = require("express").Router();
const upload = require('../_shared/middleware/file.middleware');

const {
  getAllStudents,
  getStudentsByCourse,
  getStudentById,
  updateStudentById,
  postNewStudent,
  newCourseInStudent,
  removeCourseInStudent, 
  updateImageStudent,
  deleteStudent,
} = require("../controllers/student.controller");

studentRouter.get("/", getAllStudents);
studentRouter.get("/course/:courseid", getStudentsByCourse);
studentRouter.get("/:id", getStudentById);
studentRouter.put("/:id", upload.single('image'), updateStudentById);
studentRouter.post("/", upload.single('image'), postNewStudent);
studentRouter.patch("/image/:id", upload.single('image'), updateImageStudent);
studentRouter.patch("/newcourse/:id", newCourseInStudent);
studentRouter.patch("/removecourse/:id", removeCourseInStudent);
studentRouter.delete("/:id", deleteStudent);

module.exports = studentRouter;
