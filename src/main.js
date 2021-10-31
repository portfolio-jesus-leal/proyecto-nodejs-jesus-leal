const express = require('express');
const { connectWithDB } = require('./utils/db/db');
const coursesRoutes = require('./routes/course.routes');
const studentsRoutes = require('./routes/student.routes');
const tutorsRoutes = require('./routes/tutor.routes');

const PORT = 3001;
const app = express();

connectWithDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/courses', coursesRoutes);
app.use('/students', studentsRoutes);
app.use('/tutors', tutorsRoutes);

app.use('*', (req, res, next) => {
    const error = new Error();
    error.message="Path not existing";
    error.status=404;
    return next(error);
});

//Esto siempre va aquí al final
// Con lo de || se indica que valor enviar si el elemento que se quiere utilizar llega vacío
app.use( (error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || "Unexpected error");
})

app.listen(PORT, () => {
    console.info(`Server is running in http://localhost:${PORT}`)
})