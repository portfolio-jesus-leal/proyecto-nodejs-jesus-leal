const tutorRouter = require("express").Router();
const {
  getAllTutors,
  getTutorById,
  postNewTutor,
  updateTutorById,
  deleteTutorById,
} = require("../controllers/tutor.controller");

tutorRouter.get("/", getAllTutors);
tutorRouter.get("/:id", getTutorById);
tutorRouter.post("/", postNewTutor);
tutorRouter.put("/:id", updateTutorById);
tutorRouter.delete("/:id", deleteTutorById);

module.exports = tutorRouter;
