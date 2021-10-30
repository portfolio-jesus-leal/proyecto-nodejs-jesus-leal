const movieRouter = require('express').Router();
const { getAllMovies, getMovieById, getMovieByTitle, getMoviesByGenre, getMoviesByYear, postNewMovie } = require('../controllers/movies.controller');

movieRouter.get('/', getAllMovies);
movieRouter.get('/:id', getMovieById);
movieRouter.get('/title/:title', getMovieByTitle);
movieRouter.get('/genre/:genre', getMoviesByGenre);
movieRouter.get('/year/:year', getMoviesByYear);
movieRouter.post('/', postNewMovie);

module.exports = movieRouter;