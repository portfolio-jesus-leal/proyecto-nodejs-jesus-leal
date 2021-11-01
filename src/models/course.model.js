const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
{
    title: { type: String, required:true,  unique:true, trim:true  },
    status: { type: String, 
        required:true, 
        enum:['Open', 'inProgress', 'Close' ],
        default: 'Open',
        trim:true },
    startDate: { type: Date },
    tutor: {type: mongoose.Types.ObjectId, ref: 'Tutors'}
},
{
    timestamps: true
});

// Name of collection in MongoDB and schema
const Course = mongoose.model('Courses', courseSchema);

module.exports = Course;