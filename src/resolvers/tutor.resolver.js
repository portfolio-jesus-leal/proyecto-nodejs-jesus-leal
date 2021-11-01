const Tutor = require("../models/tutor.model");

class TutorResolver {
    static async existsById(id) {
        try {
            const result = await Tutor.findById(id);
            console.log('Result ->', result);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TutorResolver;