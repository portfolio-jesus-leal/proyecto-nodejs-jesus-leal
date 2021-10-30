const Cinema = require('../models/cinema.model');

// El next es porque ya tenemos dfinido nuestro gestor de errores
// Por lo que el catch deberá pasar el control a next con el error
const getAllCinemas = async (req, res, next) => {
    try {
        const allCinemas = await Cinema.find().populate('movies');
        return res.status(200).json(allCinemas);
    } catch (error) {
        return next(error);
    }
}

const postNewCinema = async (req, res, next) => {
    try {

        const newCinema = new Cinema(req.body);
        console.log(newCinema);
        const newCinemaInDB = await newCinema.save();
        return res.status(200).send(newCinemaInDB);

    } catch (error) {
        return next(error);
    }
}

const pathNewMovieInCinema = async (req, res, next) => {
    try {
        const { id } = req.params;
        const idMovie = req.body.idMovie;
        const updateCinemaWithMovie = await Cinema.findByIdAndUpdate(id, {$push: {movies:idMovie}});
        return res.status(200).json(updateCinemaWithMovie);

    } catch (error) {
        return next(error);
    }
}

module.exports = { 
    getAllCinemas,
    postNewCinema,
    pathNewMovieInCinema
};