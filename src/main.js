const express = require('express');
const { connectWithDB } = require('./utils/db/db');
const moviesRoutes = require('./routes/movies.routes');
const cinemasRoutes = require('./routes/cinema.routes');

const PORT = 3001;
const app = express();

connectWithDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/movies', moviesRoutes);
app.use('/cinemas', cinemasRoutes);

app.use('*', (req, res, next) => {
    const error = new Error();
    error.message="Path not existing";
    error.status=404;
    return next(error);
    //res.status(404).json("Path not existing");
});

//Esto siempre va aquí al final
// Con lo de || se indica que valor enviar si el elemento que se quiere utilizar llega vacío
app.use( (error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || "Unexpected error");
})

app.listen(PORT, () => {
    console.info(`Server is running in http://localhost:${PORT}`)
})