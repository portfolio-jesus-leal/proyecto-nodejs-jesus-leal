const mongoose = require('mongoose');

const cinemaSchema = new mongoose.Schema(
{
    name: { type: String, required:true, unique:true, trim:true },
    location: { type: String, required:true, trim:true },
    movies: [{type: mongoose.Types.ObjectId, ref: 'movies'}]
},
{
    timestamps: true
});

// Name of collection in MongoDB and schema
const Cinema = mongoose.model('cinemas', cinemaSchema);

module.exports = Cinema;