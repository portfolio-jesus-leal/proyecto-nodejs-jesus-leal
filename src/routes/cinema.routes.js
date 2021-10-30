const cinemaRouter = require('express').Router();
const { getAllCinemas, postNewCinema, pathNewMovieInCinema } = require('../controllers/cinema.controller');

cinemaRouter.get('/', getAllCinemas);
cinemaRouter.post('/', postNewCinema);
cinemaRouter.patch('/newmovie/:id', pathNewMovieInCinema);

module.exports = cinemaRouter;