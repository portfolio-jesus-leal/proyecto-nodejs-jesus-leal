const Tutor = require("../models/tutor.model");
const CourseResolver = require("../resolvers/course.resolver");

//
// GET all tutors
//
const getAllTutors = async (req, res, next) => {
  try {
    const allTutors = await Tutor.find();
    return res.status(200).json(allTutors);
  } catch (err) {
    return next(err);
  }
};

//
// GET a tutor by Id
//
const getTutorById = async (req, res, next) => {
  try {
    const tutorById = await Tutor.findById(req.params.id);
    return res.status(200).json(tutorById);
  } catch (err) {
    return next(err);
  }
};

//
// POST - Create a new tutor
//
const postNewTutor = async (req, res, next) => {
  try {
    const newTutor = new Tutor({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
    });
    const newTutorInDB = await newTutor.save();
    return res.status(201).send(newTutorInDB);
  } catch (error) {
    return next(err);
  }
};

//
// PUT - Update a tutor
//
const updateTutorById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, surname, email } = req.body;

    const updatedTutor = await Tutor.findByIdAndUpdate(id, {
      name,
      surname,
      email,
    });
    return res.status(200).json(updatedTutor);
  } catch (error) {
    return next(error);
  }
};

//
// DELETE Tutor
// Before deleting the tutor, it checks whether the tutor is assigned to some course.
//
const deleteTutorById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const courses = await CourseResolver.findByTutor(id);

    if (courses.length) {
        const error = new Error();
        error.message="Tutor has linked courses, unlink them first before deleting tutor";
        error.status=400;
        return next(error);
    }

    const tutor = await Tutor.findByIdAndDelete(id);
    return res.status(200).json(tutor);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllTutors,
  getTutorById,
  postNewTutor,
  updateTutorById,
  deleteTutorById,
};
