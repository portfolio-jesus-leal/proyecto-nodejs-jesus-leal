const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
{
    name: { type: String, required:true, trim:true },
    surname: { type: String, required:true, trim:true },
    address: { type: String, required:true},
    email: { type: String, required:true},
    image: { type: String },
    courses: [{type: mongoose.Types.ObjectId, ref: 'Courses'}]
},
{
    timestamps: true
});

// Name of collection in MongoDB and schema
const Student = mongoose.model('Students', studentSchema);

module.exports = Student;