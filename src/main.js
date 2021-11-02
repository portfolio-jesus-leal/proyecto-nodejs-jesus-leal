const express = require('express');
const { connectWithDB } = require('./_shared/utils/db/db');
// Main routes
const coursesRoutes = require('./routes/course.routes');
const studentsRoutes = require('./routes/student.routes');
const tutorsRoutes = require('./routes/tutor.routes');
// Middleweare logging
const logging = require('./_shared/middleware/logging.middleware');

const PORT = 3001;
const app = express();

connectWithDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logging);

// Routes
app.use('/courses', coursesRoutes);
app.use('/students', studentsRoutes);
app.use('/tutors', tutorsRoutes);

app.use('*', (req, res, next) => {
    const error = new Error();
    error.message="Path not existing";
    error.status=404;
    return next(error);
});

// Base Error Handler
app.use((error, req, res, next) => {

    const exception = {
        status: (error.status || 500),
        message: (error.message  ||  'An unexpected error happened'),
    }

    if (process.env.NODE_ENV !== 'production') {
        exception['callstack'] = error.stack;
    }

    console.error(exception);
    res.status(exception.status).json(exception)
});

app.listen(PORT, () => {
    console.info(`Server is running in http://localhost:${PORT}`)
})