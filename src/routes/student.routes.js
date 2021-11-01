const studentRouter = require("express").Router();
const {
  getAllStudents,
  getStudentsByCourse,
  getStudentById,
  updateStudentById,
  postNewStudent,
  pathNewCourseInStudent,
  deleteStudent,
} = require("../controllers/student.controller");

studentRouter.get("/", getAllStudents);
studentRouter.get("/course/:id", getStudentsByCourse);
studentRouter.get("/:id", getStudentById);
studentRouter.put("/:id", updateStudentById);
studentRouter.post("/", postNewStudent);
studentRouter.patch("/newcourse/:id", pathNewCourseInStudent);
studentRouter.delete("/:id", deleteStudent);

module.exports = studentRouter;
