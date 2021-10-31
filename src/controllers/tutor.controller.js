const Tutor = require('../models/tutor.model');

const getAllTutors = async (req, res, next) => {
    try {
        const allTutors = await Tutor.find();
        return res.status(200).json(allTutors);
    } catch (err) {
        return next(err);
    }
}

const getTutorById = async (req, res, next) => {
    try {
        const tutorById = await Tutor.findById(req.params.id);
        return res.status(200).json(tutorById);
    } catch(err) { 
        return next(err);
    }
}

const postNewTutor = async (req, res, next) => {
    try {

        const newTutor = new Tutor(
            {
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
            }
        )
        console.log(newTutor);
        const newTutorInDB = await newTutor.save();
        return res.status(200).send(newTutorInDB);

    } catch (error) {
        return next(err);
    }
}

module.exports = { 
    getAllTutors,
    getTutorById, 
    postNewTutor
};