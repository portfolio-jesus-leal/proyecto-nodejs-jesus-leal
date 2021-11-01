const Student = require('../models/student.model');

// El next es porque ya tenemos definido nuestro midlerware para gestionar los errores
// Por lo que el catch deberá pasar el control a next con el error
const getAllStudents = async (req, res, next) => {
    try {
        const allStudents = await Student.find().populate('courses');
        return res.status(200).json(allStudents);
    } catch (error) {
        return next(error);
    }
}

const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const students = await Student.findById(id).populate('courses');        
        return res.status(200).json(students);
    } catch (error) {
        return next(error);
    }
}

//
// POST - Create a new student
//
const postNewStudent = async (req, res, next) => {
    try {

        const newStudent = new Student(
            {
                name: req.body.name,
                surname: req.body.surname,
                address: req.body.address,
                email: req.body.email,
                courses: req.body.courses,
            }
        )
        const newStudentInDB = await newStudent.save();

        //const { name, surname, address, email, courses } = req.body;
        //const newStudentInDB = await Course.create({ name, surname, address, email, courses });
        res.status(201).json(newStudentInDB);

    } catch (error) {
        return next(error);
    }
}

const pathNewCourseInStudent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const idCourse = req.body.idCourse;
        const updateStudentWithCourse = await Student.findByIdAndUpdate(id, {$push: {movies:idCourse}});
        return res.status(200).json(updateStudentWithCourse);

    } catch (error) {
        return next(error);
    }
}

module.exports = { 
    getAllStudents,
    getStudentById,
    postNewStudent,
    pathNewCourseInStudent
};