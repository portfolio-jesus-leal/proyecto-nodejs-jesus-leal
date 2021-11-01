const Student = require("../models/student.model");

class StudentResolver {

    static async findByCourse( courseId ) {

        try {
            return Student.find({ courses: courseId });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = StudentResolver;