const Course = require("../models/course.model");

class CourseResolver {
    static async existCourses(courses) {

        try {
            for (const courseId of courses) {
                await Course.findById(courseId);
            }
            return true;
        } catch (error) {
            throw error;
        }
    }

    static async findByTutor(tutorId) {

        try {
            return Course.find({ tutor: tutorId });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CourseResolver;