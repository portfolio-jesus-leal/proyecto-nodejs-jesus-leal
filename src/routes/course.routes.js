const courseRouter = require("express").Router();
const {
  getAllCourses,
  getCourseById,
  getCoursesByStatus,
  postNewCourse,
  deleteCourse,
  updateCourseById,
  pathUpdateTitle,
  pathUpdateTutor,
  pathUpdateStartDate,
  pathUpdateStatus,
} = require("../controllers/course.controller");

courseRouter.get("/", getAllCourses);
courseRouter.get("/:id", getCourseById);
courseRouter.get("/status/:status",getCoursesByStatus);
courseRouter.post("/", postNewCourse);
courseRouter.delete("/:id", deleteCourse);
courseRouter.put("/:id", updateCourseById);
courseRouter.patch("/title/:id", pathUpdateTitle);
courseRouter.patch("/tutor/:id", pathUpdateTutor);
courseRouter.patch("/startdate/:id", pathUpdateStartDate);
courseRouter.patch("/status/:id", pathUpdateStatus);

module.exports = courseRouter;
