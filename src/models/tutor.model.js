const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema(
{
    name: { type: String, required:true, trim:true },
    surname: { type: String, required:true, trim:true },
    email: { type: String},
},
{
    timestamps: true
});

// Name of collection in MongoDB and schema
const Tutor = mongoose.model('Tutors', tutorSchema);

module.exports = Tutor;