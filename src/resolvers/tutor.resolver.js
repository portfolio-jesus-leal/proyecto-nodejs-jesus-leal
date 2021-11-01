const Tutor = require("../models/tutor.model");

class TutorResolver {
    static async existsById(id) {
        try {
            await Tutor.findById(id);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TutorResolver;