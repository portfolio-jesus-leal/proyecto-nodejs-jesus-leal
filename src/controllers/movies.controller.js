const Movie = require('../models/movies.model');

const getAllMovies = async (req, res, next) => {
    try {
        const allMovies = await Movie.find();
        return res.status(200).json(allMovies);
    } catch (err) {
        return next(err);
    }
}

const getMovieById = async (req, res, next) => {
    try {
        const movieById = await Movie.findById(req.params.id);
        return res.status(200).json(movieById);
    } catch(err) { 
        return next(err);
    }
}

const getMovieByTitle = async (req, res, next) => {
    const { title } = req.params;
    console.log('Params->',req.params);
    console.log('title->',title);
    try {
        //Esto se puede hacer así cuando el atributo y la variable tengan el mismo nombre
        const movieByTitle = await Movie.findOne({title});
        return res.status(200).json(movieByTitle);
    } catch(err) { 
        return next(err);
    }
}

const getMoviesByGenre = async (req, res, next) => {
    const { genre } = req.params;
    console.log('Params->',req.params);
    console.log('genre->',genre);
    try {
        //Esto se puede hacer así cuando el atributo y la variable tengan el mismo nombre
        const movieByGenre = await Movie.find({genre});
        return res.status(200).json(movieByGenre);
    } catch(err) { 
        return next(err);
    }    
}

const getMoviesByYear = async (req, res, next) => {
    const { year } = req.params;
    console.log('Params->',req.params);
    console.log('year->',year);
    try {
        const moviesByYear = await Movie.find({year:{$gte:year}}).sort({year:1});
        return res.status(200).json(moviesByYear);
    } catch(err) { 
        return next(err);
    }    
}

const postNewMovie = async (req, res, next) => {
    try {

        const newMovie = new Movie(
            {
                title: req.body.title,
                director: req.body.director,
                year: req.body.year,
                genre: req.body.genre,
            }
        )
        console.log(newMovie);
        const newMovieInDB = await newMovie.save();
        return res.status(200).send(newMovieInDB);

    } catch (error) {
        return next(err);
    }
}

module.exports = { 
    getAllMovies,
    getMovieById, 
    getMovieByTitle,
    getMoviesByGenre, 
    getMoviesByYear,
    postNewMovie
};